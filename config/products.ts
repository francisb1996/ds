import ProductConfig from "../domain/ProductConfig"

const products: Map<string, ProductConfig> = new Map()

products.set('RxRules', {
    proxy: 'rxrules-proxy',
    tenants: ['nationwide'],
    evidence: [
        {
            type: 'ExamOne',
            format: 'xml',
        }
    ],
    output: [
        {
            name: 'rxRulesOutput',
            format: 'xml'
        }
    ]
})

products.set('RxPredictiveModel', {
    proxy: 'pm-proxy',
    dependencies: [
        {
            name: 'RxRules',
            output: 'rxRulesOutput'
        }
    ],
    tenants: ['nationwide', 'cuna'],
    output: [
        {
            name: 'rxPmOutput',
            format: 'xml'
        }
    ]
})

products.set('DHD', {
    proxy: 'dhd-proxy',
    tenants: ['nationwide', 'cuna'],
    output: [
        {
            name: 'dhdOutput',
            format: 'json'
        }
    ]
})

export default products
