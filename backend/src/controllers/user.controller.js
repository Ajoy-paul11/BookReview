import { User } from "../models/user.model.js"
import { AsyncHandler } from "../utils/AsyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"



const registerUser = AsyncHandler(async (req, res, next) => {
    const { name, email, password, favorite_genre } = req.body

    if ([name, email, password, favorite_genre].some(field => field?.trim() === "")) {
        return next(new ApiError(404, "Fields can't be empty!"))
    }

    const getUser = await User.findOne({ email })
    if (getUser) {
        return next(new ApiError(401, "Email already exists"))
    }

    const createUser = await User.create(
        { name, email, password, favorite_genre }
    )

    const newUser = await User.findById(createUser._id).select("-password")

    if (!newUser) {
        return next(new ApiError(501, "Internal Server Error while registering"))
    }

    return res.status(201).json(new ApiResponse(201, newUser, "User registered successfully"))

})


const loginUser = AsyncHandler(async (req, res, next) => {

    const { email, password } = req.body

    if (!email?.trim() || !password?.trim()) {
        return next(new ApiError(401, "Both fields are required to login"))
    }

    const findUser = await User.findOne({ email })

    if (!findUser) {
        return next(new ApiError(404, "User does not exist"))
    }

    const checkPassword = await findUser.isPasswordCorrect(password)

    if (!checkPassword) {
        return next(new ApiError(401, "Invalid User Credentials"))
    }

    const loggedUser = await User.findById(findUser._id).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, loggedUser, "User logged In user successfully"))
})


const getUserDetails = AsyncHandler(async (req, res, next) => {
    const { id } = req.params

    const getUser = await User.findById(id).select("-password")
    if (!getUser) {
        return next(new ApiError(404, "Invalid user id provided to fetch user data"))
    }

    return res.status(201).json(new ApiResponse(201, getUser, "Fetch user data "))
})


const updateUserDetails = AsyncHandler(async (req, res, next) => {
    const { id } = req.params

    const checkUser = await User.findById(id)
    if (!checkUser) {
        return next(new ApiError(401, "User not found to that userId"))
    }

    const { name, favorite_genre } = req.body
    if (!name || !favorite_genre) {
        return next(new ApiError(404, "All fields are required"))
    }

    const updatedUser = await User.findByIdAndUpdate(checkUser._id,
        { $set: { name, favorite_genre } },
        { new: true }
    )

    return res.status(201).json(new ApiResponse(201, updatedUser, "User details updated successfully"))
})


export { registerUser, loginUser, getUserDetails, updateUserDetails }