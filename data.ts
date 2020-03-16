import { Handler, SQSEvent } from 'aws-lambda'
import TransactionResponse from './domain/TransactionResponse'
import * as dynamo from './aws/dynamo'
import * as s3 from './aws/s3'
import ProductResponse from './domain/ProductResponse'
import TransactionRequest from './domain/TransactionRequest'

export const saveTransaction: Handler<TransactionRequest, TransactionResponse> = async (request: TransactionRequest) => {
    console.log('data: saving request')
    const resourceID = await dynamo.save(request)
    await s3.save(request)
    return new TransactionResponse(resourceID)
}

export const getTransaction: Handler<string, TransactionResponse> = async (resourceID: string) => {
    console.log('data: retrieving transaction')
    const transactionData = await dynamo.get(resourceID)
    const s3record = await s3.get(resourceID)
    return new TransactionResponse(transactionData.resourceID, s3record.products)
}

export const updateTransaction: Handler<SQSEvent, string> = async (event: SQSEvent) => {
    console.log('data: updating transaction')
    event.Records.forEach(async (record) => {
        const productResponse = JSON.parse(record.body) as ProductResponse
        await dynamo.update(productResponse)
        await s3.update(productResponse)
    })
    return 'transaction updated'
}
