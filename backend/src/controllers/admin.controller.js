import { Book } from "../models/book.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const addBook = AsyncHandler(async (req, res) => {
    const { title, author, image_url, genre } = req.body
    if ([title, author, image_url, genre].some(field => field?.trim() === "")) {
        return res.status(404).json(new ApiError(404, "All fields are required"))
    }

    const findBook = await Book.findOne({ $and: [{ title, author }] })
    if (findBook) {
        return res.status(400).json(new ApiError(400, "Book already exists"))
    }

    const newBook = await Book.create(
        { title, genre, author, image_url }
    )

    if (!newBook) {
        return res.status(501).json(new ApiError(501, "Server error while adding a book"))
    }

    return res.status(201).json(new ApiResponse(201, newBook, "Book is added successfully"))
})


const getBookData = AsyncHandler(async (req, res) => {
    const search = req.query.search || ""
    let genre = req.query.genre || ""

    let queryObj = { title: { $regex: search, $options: "i" } }
    if (genre) {
        queryObj.genre = genre
    }

    const specificBooks = await Book.find(queryObj)

    if (!specificBooks) {
        return res
            .status(501)
            .json(new ApiError(501, "Something went wrong while fetching book data"))
    }

    return res.status(200).json(new ApiResponse(200, specificBooks))
})


export { addBook, getBookData };