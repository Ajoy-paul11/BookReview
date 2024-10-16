import { Review } from "../models/review.model.js";
import { Book } from "../models/book.model.js"
import { User } from "../models/user.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const submitReview = AsyncHandler(async (req, res, next) => {
    const { bookId, userId, rating, content } = req.body;

    Number(rating)
    if (!bookId || !userId || !rating || !content) {
        return next(new ApiError(401, "All fields are required"));
    }

    const book = await Book.findById(bookId);
    if (!book) {
        return next(new ApiError(404, "Book not found"));
    }

    const user = await User.findById(userId);
    if (!user) {
        return next(new ApiError(404, "User not found"));
    }

    const findReview = await Review.findOne({
        book: book._id,
        user: user._id
    })

    if (findReview) {
        return next(new ApiError(404, "Already Submit the review"))
    }

    const review = await Review.create({
        book: bookId,
        user: userId,
        rating,
        content
    });

    return res.status(201).json(
        new ApiResponse(201, review, "Review submitted successfully")
    );
})


const getBookReviews = AsyncHandler(async (req, res, next) => {
    const { id } = req.params

    const book = await Book.findById(id);
    if (!book) {
        return next(new ApiError(401, "Book not found"))
    }

    const reviews = await Review.find({ book: id })
        .populate('user', 'name')
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, reviews, `Retrieved ${reviews.length} reviews for the book`)
    );
})


export { submitReview, getBookReviews }