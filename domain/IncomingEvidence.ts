export default class IncomingEvidence {
    type: string
    format: string
    data: string

    constructor(type: string, format: string, data: string) {
        this.type = type
        this.format = format
        this.data = data
    }
}