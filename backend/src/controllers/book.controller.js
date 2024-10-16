import { Book } from "../models/book.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const getAllBooks = AsyncHandler(async (req, res, next) => {
    const page = Number(req.query.page) - 1 || 0;
    const limit = Number(req.query.limit) || 3;
    const books = await Book.find({}).skip(page * limit)
        .limit(limit)

    if (!books) {
        return next(new ApiError(501, "Internal server error while fetching book data"))
    }

    const totalBook = await Book.countDocuments({})
    const getInfo = {
        books,
        totalBook
    }

    return res.status(200).json(new ApiResponse(200, getInfo, "Books fetched successfully"))
})


const getBookById = AsyncHandler(async (req, res, next) => {
    const { id } = req.params

    const book = await Book.findById(id)
    if (!book) {
        return next(new ApiError(401, "Book not found with that Id"))
    }

    return res.status(201).json(new ApiResponse(201, book, "Book data fetched successfully"))
})



export { getAllBooks, getBookById }