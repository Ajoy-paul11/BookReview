import { Router } from "express"
import {
    registerUser,
    loginUser,
    getUserDetails,
    updateUserDetails
} from "../controllers/user.controller.js"


const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/:id").get(getUserDetails)
router.route("/:id").patch(updateUserDetails)


export default router;