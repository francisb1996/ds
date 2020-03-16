import Evidence from './IncomingEvidence'
import Status from './Status'

export default class ProductResponse {
    product: string
    status: Status
    results: Evidence[]
}