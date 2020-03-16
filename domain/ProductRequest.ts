import IncomingEvidence from './IncomingEvidence'

export default class ProductRequest {
    product: string
    resourceID: string
    evidence: IncomingEvidence[]

    constructor(product: string, resourceID: string, evidence: IncomingEvidence[]) {
        this.product = product
        this.resourceID = resourceID
        this.evidence = evidence
    }
}