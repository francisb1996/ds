export default class TransactionData {
    externalTrackingID: string
    tenantID: string
    resourceID: string

    constructor(id: string, tenantID: string, externalTrackingID: string) {
        this.resourceID = id
        this.tenantID = tenantID
        this.tenantID = externalTrackingID
    }
}