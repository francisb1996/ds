import { Handler, APIGatewayEvent } from 'aws-lambda'
import TransactionResponse from './domain/TransactionResponse'
import TransactionRequest from './domain/TransactionRequest'
import ApiResponse from './domain/ApiResponse'
import { invoke } from './aws/lambda'
import TransactionData from './domain/TransactionData'
import TransactionReport from './domain/TransactionReport'
// TODO:
// - Real product proxies
// - eslint

export const authenticate: Handler<APIGatewayEvent, ApiResponse<any>> = async (event: APIGatewayEvent) => {
    console.log('api: auth invoked!')
    return new ApiResponse(201, {
        access_token: 'dfgpigdijg0q84lnva82'
    })
}

export const submitTransaction: Handler<APIGatewayEvent, ApiResponse<TransactionResponse>> = async (event: APIGatewayEvent) => {
    const request = JSON.parse(event.body) as TransactionRequest
    console.log('api: POST invoked')
    const saveResponse = await invoke('save-transaction', request)
    const transaction = JSON.parse(saveResponse) as TransactionResponse
    invoke('execute-transaction', { ...request, tenantID: event.pathParameters.tenantID, resourceID: transaction.resourceID })
    return new ApiResponse(201, transaction)
}

export const getTransaction: Handler<APIGatewayEvent, ApiResponse<TransactionResponse>> = async (event: APIGatewayEvent) => {
    console.log('api: GET TransactionResponse invoked')
    const getResponse = await invoke('get-transaction', event.pathParameters.resourceID)
    const transaction = JSON.parse(getResponse) as TransactionResponse
    const getDataResponse = await invoke('get-transaction-data', event.pathParameters.resourceID)
    const data = JSON.parse(getDataResponse) as TransactionData
    // filter
    transaction.products = transaction.products.filter(product => data.requestedProducts.includes(product.product))
    return new ApiResponse(200, transaction)
}

export const getTransactionReport: Handler<APIGatewayEvent, ApiResponse<TransactionReport>> = async (event: APIGatewayEvent) => {
    console.log('api: GET TransactionReport invoked')
    const getResponse = await invoke('get-transaction', event.pathParameters.resourceID)
    const transaction = JSON.parse(getResponse) as TransactionResponse
    const getDataResponse = await invoke('get-transaction-data', event.pathParameters.resourceID)
    const data = JSON.parse(getDataResponse) as TransactionData
    const getRequestResponse = await invoke('get-transaction-request', event.pathParameters.resourceID)
    const request = JSON.parse(getRequestResponse) as TransactionRequest
    const report = new TransactionReport(event.pathParameters.resourceID, data.tenantID, data.externalTrackingID, request, transaction.products)
    return new ApiResponse(200, report)
}
