import { Handler, APIGatewayEvent } from 'aws-lambda'
import TransactionResponse from './domain/TransactionResponse'
import TransactionRequest from './domain/TransactionRequest'
import ApiResponse from './domain/ApiResponse'
import { invoke } from './aws/lambda'
// TODO:
// - Determine product execution order
// - Setup serverless-offline-sqs
// - Handle async product proxies
// - Actual Dynamo/S3 integration

export const authenticate: Handler<APIGatewayEvent, ApiResponse<any>> = async (event: APIGatewayEvent) => {
    console.log('api: auth invoked!')
    return new ApiResponse(201, {
        access_token: 'dfgpigdijg0q84lnva82'
    })
}

export const submitTransaction: Handler<APIGatewayEvent, ApiResponse<TransactionResponse>> = async (event: APIGatewayEvent) => {
    const request = JSON.parse(event.body) as TransactionRequest
    console.log('api: POST invoked', request)
    const saveResponse = await invoke('save-transaction', request)
    const transaction = JSON.parse(saveResponse) as TransactionResponse
    invoke('execute-transaction', { ...request, resourceID: transaction.resourceID })
    return new ApiResponse(201, transaction)
}

export const getTransaction: Handler<APIGatewayEvent, ApiResponse<TransactionResponse>> = async (event: APIGatewayEvent) => {
    console.log('api: GET invoked')
    const getResponse = await invoke('get-transaction', event.pathParameters.resourceID)
    const transaction = JSON.parse(getResponse) as TransactionResponse
    return new ApiResponse(200, transaction)
}
