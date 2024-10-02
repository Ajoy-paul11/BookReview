import { User } from "../models/user.model.js"
import { AsyncHandler } from "../utils/AsyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"



const registerUser = AsyncHandler(async (req, res) => {
    const { name, email, password, favorite_genre } = req.body

    if ([name, email, password, favorite_genre].some(field => field?.trim() === "")) {
        return res.status(400).json(new ApiError(200, "Fields can't be empty!"))
    }

    const getUser = await User.findOne({ email })
    if (getUser) {
        return res.status(400).json(new ApiError(200, "Email already exists"))
    }

    const createUser = await User.create(
        { name, email, password, favorite_genre }
    )

    const newUser = await User.findById(createUser._id).select("-password")

    if (!newUser) {
        return res.status(501).json(new ApiError(501, "Internal Server Error while registering"))
    }

    return res.status(200).json(new ApiResponse(200, newUser, "User registered successfully"))

})


const loginUser = AsyncHandler(async (req, res) => {

    const { email, password } = req.body

    if (!email?.trim() || !password?.trim()) {
        throw new ApiError(400, "Both fields are required to login")
    }

    const findUser = await User.findOne({ email })

    if (!findUser) {
        throw new ApiError(400, "User does not exist")
    }

    const checkPassword = await findUser.isPasswordCorrect(password)

    if (!checkPassword) {
        throw new ApiError(401, "Invalid User Credentials")
    }

    const loggedUser = await User.findById(findUser._id).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, loggedUser, "User logged In user successfully"))
})


const getUserDetails = AsyncHandler(async (req, res) => {
    const { id } = req.params

    const getUser = await User.findById(id).select("-password")
    if (!getUser) {
        return res.status(501).json(new ApiError(501, "Internal Server error while fetching the user data!"))
    }

    return res.status(201).json(new ApiResponse(201, getUser, "Fetch user data "))
})


const updateUserDetails = AsyncHandler(async (req, res) => {
    const { id } = req.params

    const checkUser = await User.findById(id)
    if (!checkUser) {
        return res.status(404).json(new ApiError(404, "User not found"))
    }

    const { name, favorite_genre } = req.body
    if (!name || !favorite_genre) {
        return res.status(401).json(new ApiError(401, "All fields are required"))
    }

    const updatedUser = await User.findByIdAndUpdate(checkUser._id,
        { $set: { name, favorite_genre } },
        { new: true }
    )

    if (!updatedUser) {
        return res.status(501).json(new ApiError(501, "Internal Server error while updating details"))
    }

    return res.status(201).json(new ApiResponse(201, updatedUser, "User details updated successfully"))
})


export { registerUser, loginUser, getUserDetails, updateUserDetails }