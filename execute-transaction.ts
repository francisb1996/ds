import { Handler } from 'aws-lambda'
import TransactionRequest from './domain/TransactionRequest'
import products from './config/products'
import { invoke } from './aws/lambda'
import ProductRequest from './domain/ProductRequest'
import TransactionResponse from './domain/TransactionResponse'

const POLL_RATE = 2000;
const POLL_TIMES = 10;

export const executeTransaction: Handler<TransactionRequest> = async (request: TransactionRequest) => {
    console.log('execute transaction invoked', request)
    // determine independent/dependent product requests
    const independentProducts: ProductRequest[] = []
    const dependentProducts: ProductRequest[] = []
    request.products.forEach((product) => {
        const config = products.get(product.product)
        if (config.dependencies && config.dependencies.length > 0) {
            dependentProducts.push(new ProductRequest(product.product, request.resourceID, request.evidence))
            config.dependencies.forEach(dep => independentProducts.push(new ProductRequest(dep.name, request.resourceID, request.evidence)))
        } else {
            independentProducts.push(new ProductRequest(product.product, request.resourceID, request.evidence))
        }
    })

    console.log('Independent products: ', independentProducts)
    console.log('Dependent products: ', dependentProducts)

    // execute independent product requests
    independentProducts.forEach(async (product) => {
        console.log(`executing ${product.product}`, product)
        invoke(products.get(product.product).proxy, product)
    })
    // handle dependent product requests
    if (dependentProducts && dependentProducts.length > 0) {
        let counter = 0;
        await new Promise((resolve) => {
            setInterval(async () => {
                console.log('polling transaction for dependencies...')
                const transactionString = await invoke('get-transaction', request.resourceID)
                const transaction = JSON.parse(transactionString) as TransactionResponse
                const currentOutputs: string[] = transaction.products 
                    ? transaction.products.reduce((acc, product) => acc.concat(product.results.map(res => res.type)), [])
                    : []
                dependentProducts.forEach(async (product, index) => {
                    // execute dependent product request if required output is available
                    const config = products.get(product.product)
                    const requiredOutputs: string[] = config?.dependencies?.map(dep => dep.output)
                    if (requiredOutputs.every(output => currentOutputs.includes(output))) {
                        console.log(`executing ${product.product}. required: ${requiredOutputs}`)
                        await invoke(products.get(product.product)?.proxy, product)
                        dependentProducts.splice(index, 1)
                    }
                })
                if (dependentProducts.length === 0) {
                    console.log('All products executed')
                    resolve()
                } else {
                    counter++
                    if (counter === POLL_TIMES) {
                        console.error('Timeout while waiting for dependencies!')
                        resolve()
                    }
                }
            }, POLL_RATE)
        })
    }
}