export default class ApiResponse<T> {
    headers?: Map<string, string>
    statusCode: ValidSatusCode
    body?: string

    constructor(status: ValidSatusCode, payload: T, headers?: Map<string, string>) {
        this.statusCode = status
        this.body = JSON.stringify(payload)
        this.headers = headers
    }
}

type ValidSatusCode = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 409 | 500