import EvidenceConfig from "./EvidenceConfig"

type ProductDependency = {
    name: string
    output: string
}

type ProductOutputConfig = {
    name: string
    format: string
}

export default class ProductConfig {
    proxy: string
    tenants: string[]
    output: ProductOutputConfig[]
    dependencies?: ProductDependency[]
    evidence?: EvidenceConfig[]
}