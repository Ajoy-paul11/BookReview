export const processError = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500
    error.message = error.message || "Internal Server error"

    res.status(error.statusCode).json(
        { status: error.statusCode, message: error.message }
    )
}