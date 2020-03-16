export default class TransactionData {
    externalTrackingID: string
    resourceID: string

    constructor(id: string) {
        this.resourceID = id
    }
}