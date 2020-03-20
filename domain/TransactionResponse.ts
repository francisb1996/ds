import ProductResponse from "./ProductResponse"

export default class TransactionResponse {
    resourceID: string
    externalTrackingID: string
    products?: ProductResponse[]
    
    constructor(id: string, externalTrackingID: string, products?: ProductResponse[]) {
        this.resourceID = id
        this.externalTrackingID = externalTrackingID
        this.products = products
    }
}