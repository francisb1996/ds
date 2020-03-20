export default class TransactionData {
    externalTrackingID: string
    tenantID: string
    resourceID: string
    requestedProducts: string[]

    constructor(id: string, tenantID: string, externalTrackingID: string, requestedProducts?: string[]) {
        this.resourceID = id
        this.tenantID = tenantID
        this.tenantID = externalTrackingID
        this.requestedProducts = requestedProducts
    }
}