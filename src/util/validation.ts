
export class ValidationError extends Error {
    constructor(message: string = "不正な入力です", options?: ErrorOptions) {
        super(message, options)
    }
}
