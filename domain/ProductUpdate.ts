import Evidence from './IncomingEvidence'
import Status from './Status'

export default class ProductUpdate {
    resourceID: string
    product: string
    output: Evidence[]
    status: Status

    constructor(product: string, status: Status, resourceID: string) {
        this.resourceID = resourceID
        this.status = status
        this.product = product
    }
}