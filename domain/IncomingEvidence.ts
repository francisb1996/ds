export default class IncomingEvidence {
    type: string
    format: string
    data: string

    constructor(type, format, data) {
        this.type = type
        this.format = format
        this.data = data
    }
}