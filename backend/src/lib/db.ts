import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        const MONGO_URI = process.env.MONGO_URI;
        if(!MONGO_URI){
            throw new Error("MONGO_URI is required in .env file");
        }

        await mongoose.connect(MONGO_URI);
        console.log("DB connected Successfully");

    } catch (error) {
        console.log("Error connecting to DB:",error);
    }
}
export default connectDB;