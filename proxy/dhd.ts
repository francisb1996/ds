import { Handler } from 'aws-lambda'
import { updateTransaction } from '../aws/sqs'
import ProductUpdate from '../domain/ProductUpdate'
import ProductRequest from '../domain/ProductRequest'
import OutgoingEvidence from '../domain/OutgoingEvidence'

export const handler: Handler<ProductRequest, string> = async (event: ProductRequest) => {
    console.log('dhd proxy hit!', event)
    // <insert dhd intgration here>
    const response = new ProductUpdate(event.product, 'Complete', event.resourceID)
    response.output = [new OutgoingEvidence('dhdOutput', 'json', '{"dhd": "output"}')]
    await updateTransaction(response)
    return 'finished'
}