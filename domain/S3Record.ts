import TransactionRequest from "./TransactionRequest"
import Evidence from "./Evidence"

export default class S3Record {
    products: Evidence[]
    request: TransactionRequest

    constructor(products: Evidence[]) {
        this.products = products
    }
}