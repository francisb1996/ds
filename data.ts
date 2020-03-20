import { Handler } from 'aws-lambda'
import TransactionResponse from './domain/TransactionResponse'
import * as dynamo from './aws/dynamo'
import * as s3 from './aws/s3'
import ProductResponse from './domain/ProductResponse'
import TransactionRequest from './domain/TransactionRequest'
import TransactionData from './domain/TransactionData'
import { v4 } from 'uuid'
import ProductUpdate from './domain/ProductUpdate'

export const saveTransaction: Handler<TransactionRequest, TransactionResponse> = async (request: TransactionRequest) => {
    console.log('data: saving request')
    const resourceID = v4()
    const products = request.products.map(product => product.product)
    await dynamo.save(new TransactionData(resourceID, request.tenantID, request.externalTrackingID, products))
    await s3.uploadRequest(resourceID, request)
    return new TransactionResponse(resourceID, request.externalTrackingID, 
        request.products.map(product => new ProductResponse(product.product, 'Pending', [])))
}

export const getTransaction: Handler<string, TransactionResponse> = async (resourceID: string) => {
    console.log('data: retrieving transaction')
    const data = await dynamo.get(resourceID)
    const responses = await s3.getProductResponses(resourceID)
    return new TransactionResponse(resourceID, data.externalTrackingID, responses)
}

export const getTransactionData: Handler<string, TransactionData> = async (resourceID: string) => {
    console.log('data: retrieving transaction')
    const data = await dynamo.get(resourceID)
    return data
}

export const getTransactionRequest: Handler<string, TransactionRequest> = async (resourceID: string) => {
    console.log('data: retrieving transaction')
    const request = await s3.getRequest(resourceID)
    return request
}

export const updateTransaction: Handler<ProductUpdate, string> = async (update: ProductUpdate) => {
    console.log('data: updating transaction')
    const response = new ProductResponse(update.product, update.status, update.output)
    await s3.uploadProductResponse(update.resourceID, response)
    return 'finished'
}
