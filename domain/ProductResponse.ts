import Status from './Status'
import OutgoingEvidence from './OutgoingEvidence'

export default class ProductResponse {
    product: string
    status: Status
    results: OutgoingEvidence[]

    constructor(product: string, status: Status, results: OutgoingEvidence[]) {
        this.product = product
        this.status = status
        this.results = results
    }
}