import mongoose, { Schema } from "mongoose";


const reviewSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    rating: {
        type: Number,
        required: true,
        min: 1
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })


export const Review = mongoose.model("Review", reviewSchema)