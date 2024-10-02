import { Router } from "express";
import { getAllBooks, getBookById } from "../controllers/book.controller.js";


const router = Router()

router.route("/").get(getAllBooks)
router.route("/:id").get(getBookById)


export default router;