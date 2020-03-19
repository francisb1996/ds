import { Handler } from 'aws-lambda'
import { updateTransaction } from '../aws/sqs'
import ProductRequest from '../domain/ProductRequest'
import ProductUpdate from '../domain/ProductUpdate'
import OutgoingEvidence from '../domain/OutgoingEvidence'

export const handler: Handler<ProductRequest, string> = async (event: ProductRequest) => {
    console.log('rxRules proxy hit!', event)
    // <insert rxRules intgration here>
    const response = new ProductUpdate(event.product, 'Complete', event.resourceID)
    response.output = [new OutgoingEvidence('rxRulesOutput', 'xml', '<rxRulesOutput></rxRulesOutput>')]
    await updateTransaction(response)
    return 'finished'
}