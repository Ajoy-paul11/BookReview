import { Router } from "express";
import { submitReview, getBookReviews } from "../controllers/review.controller.js";


const router = Router()

router.route("/").post(submitReview)
router.route("/:id").get(getBookReviews)


export default router;