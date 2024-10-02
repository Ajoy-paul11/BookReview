import mongoose, { Schema } from "mongoose"


const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
}, { timestamps: true })


export const Book = mongoose.model("Book", bookSchema)