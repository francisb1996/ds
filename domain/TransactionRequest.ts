import ProductRequest from "./ProductRequest"
import Evidence from "./IncomingEvidence"

export default class TransactionRequest {
    externalTrackingID: string
    resourceID: string
    products: ProductRequest[]
    evidence: Evidence[]
}