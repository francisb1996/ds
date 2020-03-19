import ProductRequest from "./ProductRequest"
import Evidence from "./IncomingEvidence"

export default class TransactionRequest {
    externalTrackingID: string
    products: ProductRequest[]
    evidence: Evidence[]
    resourceID: string
    tenantID: string
}