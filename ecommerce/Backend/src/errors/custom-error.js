class CustomError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

CustomError.prototype.statusCode = 0;

CustomError.prototype.serializeErrors = function () {
    return [{ message: this.message }];
};
