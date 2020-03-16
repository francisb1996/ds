import { Handler } from 'aws-lambda'
import { updateTransaction } from '../aws/sqs'
import ProductRequest from '../domain/ProductRequest'
import ProductUpdate from '../domain/ProductUpdate'
import OutgoingEvidence from '../domain/OutgoingEvidence'

export const handler: Handler<ProductRequest, void> = async (event: ProductRequest) => {
    console.log('rxRules proxy hit!', event)
    const response = new ProductUpdate(event.resourceID)
    response.output = [new OutgoingEvidence('dhdOutput', 'json')]
    await updateTransaction(response)
}