import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required : [true, "Your Email address is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Your username is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Your password is required"]
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
})

userSchema.pre("save" , async function () {
    this.password = await bcrypt.hash(this.password, 12)
})

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;