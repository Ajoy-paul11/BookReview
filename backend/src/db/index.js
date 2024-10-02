import mongoose from "mongoose"


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/BookReview`)

        console.log("\n Database Connected, DB Host: ", connectionInstance.connection.host);

    } catch (error) {
        console.log("MongoDB Connection ERROR", error);

    }
}


export default connectDB;