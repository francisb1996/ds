export default class OutgoingEvidence {
    type: string
    format: string
    data: string

    constructor(type, format) {
        this.type = type
        this.format = format
    }
}