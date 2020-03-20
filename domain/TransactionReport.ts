import TransactionRequest from "./TransactionRequest";
import ProductResponse from "./ProductResponse";

export default class TransactionReport {
    resourceID: string
    tenantID: string
    externalTrackingID: string
    request: TransactionRequest
    products: ProductResponse[]

    constructor(
        resourceID: string,
        tenantID: string,
        externalTrackingID: string,
        request: TransactionRequest,
        products: ProductResponse[],
    ) {
        this.resourceID = resourceID
        this.tenantID = tenantID
        this.externalTrackingID = externalTrackingID
        this.request = request
        this.products = products
    }
}