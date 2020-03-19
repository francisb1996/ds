import { Handler, SQSEvent } from 'aws-lambda'
import TransactionResponse from './domain/TransactionResponse'
import * as dynamo from './aws/dynamo'
import * as s3 from './aws/s3'
import ProductResponse from './domain/ProductResponse'
import TransactionRequest from './domain/TransactionRequest'
import TransactionData from './domain/TransactionData'
import { v4 } from 'uuid'
import S3Record from './domain/S3Record'
import ProductUpdate from './domain/ProductUpdate'

export const saveTransaction: Handler<TransactionRequest, TransactionResponse> = async (request: TransactionRequest) => {
    console.log('data: saving request')
    const resourceID = v4()
    await dynamo.save(new TransactionData(resourceID, request.tenantID, request.externalTrackingID))
    await s3.upload(resourceID, new S3Record(request))
    return new TransactionResponse(resourceID)
}

export const getTransaction: Handler<string, TransactionResponse> = async (resourceID: string) => {
    console.log('data: retrieving transaction')
    const transactionData = await dynamo.get(resourceID)
    const s3record = await s3.get(resourceID)
    return new TransactionResponse(transactionData.resourceID, s3record.products)
}

export const updateTransaction: Handler<SQSEvent> = async (event: SQSEvent) => {
    console.log('data: updating transaction')
    for (const record of event.Records) {
        const update = JSON.parse(record.body) as ProductUpdate
        const response = new ProductResponse(update.product, update.status, update.output)
        console.log(response)
        const s3record = await s3.get(update.resourceID)
        s3record.products.push(response)
        console.log(s3record.products)
        await s3.upload(update.resourceID, s3record)
    }
}
