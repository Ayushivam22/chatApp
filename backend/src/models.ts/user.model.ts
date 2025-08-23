import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        reuqired: true,
        minLength: 6
    },
    profilePic: {
        type: String,
        default: ""
    }
},
    {
        timestamps: true
    }
)

export default mongoose.model("User", userSchema);