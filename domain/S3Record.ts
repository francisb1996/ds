import TransactionRequest from "./TransactionRequest"
import ProductResponse from "./ProductResponse"

export default class S3Record {
    products: ProductResponse[]
    request: TransactionRequest

    constructor(request: TransactionRequest) {
        this.request = request
        this.products = []
    }
}