import { Handler } from 'aws-lambda'
import { updateTransaction } from '../aws/sqs'
import ProductUpdate from '../domain/ProductUpdate'
import ProductRequest from '../domain/ProductRequest'
import OutgoingEvidence from '../domain/OutgoingEvidence'

const RETRY_DELAY = 3000;
const RETRY_TIMES = 5;

export const handler: Handler<ProductRequest, string> = async (event: ProductRequest) => {
    console.log('pm proxy hit!', event)
    // <insert pm intgration here>
    const response = new ProductUpdate(event.product, 'Complete', event.resourceID)
    response.output = [new OutgoingEvidence('rxPmOutput', 'xml', '<rxPmOutput></rxPmOutput>')]
    await updateTransaction(response)
    return 'finished'
}