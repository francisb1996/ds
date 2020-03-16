import Evidence from './IncomingEvidence'

export default class ProductUpdate {
    resourceID: string
    output: Evidence[]

    constructor(resourceID: string) {
        this.resourceID = resourceID
    }
}