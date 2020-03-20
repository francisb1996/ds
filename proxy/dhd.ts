import { Handler } from 'aws-lambda'
import { invoke } from '../aws/lambda'
import ProductUpdate from '../domain/ProductUpdate'
import ProductRequest from '../domain/ProductRequest'
import OutgoingEvidence from '../domain/OutgoingEvidence'

const POLL_RATE = 3000;
const POLL_TIMES = 5;
const RETRY_RATE = 3000;
const RETRY_TIMES = 5;

export const handler: Handler<ProductRequest, string> = async (event: ProductRequest) => {
    console.log('dhd proxy hit!')
    // <insert dhd intgration here>
    const update = new ProductUpdate(event.product, 'Complete', event.resourceID)
    update.output = [new OutgoingEvidence('dhdOutput', 'json', '{"dhd": "output"}')]
    await invoke('update-transaction', update)
    return 'finished'
}