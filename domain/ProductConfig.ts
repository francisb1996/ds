import EvidenceConfig from "./EvidenceConfig"

export type FunctionName = 'save-transaction' | 'get-transaction' | 'execute-transaction' | 'update-transaction' |
                            'rxrules-proxy' | 'pm-proxy' | 'dhd-proxy' | 'get-transaction-data' | 'get-transaction-request'

export type ProductDependency = {
    name: string
    output: string
}

export type ProductOutputConfig = {
    name: string
    format: string
}

export default class ProductConfig {
    proxy: FunctionName
    tenants: string[]
    output: ProductOutputConfig[]
    dependencies?: ProductDependency[]
    evidence?: EvidenceConfig[]
}