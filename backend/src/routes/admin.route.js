import { Router } from "express"
import { addBook, getBookData } from "../controllers/admin.controller.js"

const router = Router()


router.route("/add").post(addBook)
router.route("/").get(getBookData)


export default router;