import express from "express"
import cors from "cors"
import { ApiError } from "./utils/ApiError.js"

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cors({ origin: "*" }))


// import the routes
import userRoutes from "./routes/user.route.js"
import bookRoutes from "./routes/book.route.js"
import reviewRoutes from "./routes/review.route.js"
import adminRoutes from "./routes/admin.route.js"



// declares the routes
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/books", bookRoutes)
app.use("/api/v1/reviews", reviewRoutes)
app.use("/api/v1/admin", adminRoutes)


// error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json(err);
    }

    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
});


export { app }