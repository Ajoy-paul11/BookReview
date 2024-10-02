// class ApiError {
//     constructor(status, message) {
//         this.status = status;
//         this.message = message;

//     }
// }

class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something Went Wrong",
    ) {
        super(message)
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            status: this.status,
            message: this.message
        };
    }
}

export { ApiError }