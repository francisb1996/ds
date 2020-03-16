import ProductResponse from "./ProductResponse"

export default class TransactionResponse {
    resourceID: string
    products?: ProductResponse[]
    
    constructor(id: string, products?: ProductResponse[]) {
        this.resourceID = id
        this.products = products
    }
}