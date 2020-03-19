import Evidence from './IncomingEvidence'
import Status from './Status'

export default class ProductResponse {
    product: string
    status: Status
    results: Evidence[]

    constructor(product: string, status: Status, results: Evidence[]) {
        this.product = product
        this.status = status
        this.results = results
    }
}