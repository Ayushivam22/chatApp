import { Request, Response } from "express";
import { SignupRequestBody } from "../../lib/interfaces";
import { COOKIE_EXPIRY_DAYS, MIN_PASSWORD_LENGTH } from "../../lib/constants";
import userModel from "../../models.ts/user.model";
import { generateTokens } from "../../lib/utils";
import bcrypt from "bcryptjs"

export const signup = async (request: Request<{}, {}, SignupRequestBody>, response: Response) => {
    try {
        const { fullName, email, password } = request.body;

        // All fields are required
        if (!fullName || !email || !password) {
            response.status(400).json(
                {
                    success: false,
                    error: "All fields are required"
                });
            return;
        }
        // Password should be at least 6 characters long
        if (password.length < MIN_PASSWORD_LENGTH) {
            response.status(400).json(
                {
                    success: false,
                    error: "Password should be at least 6 characters long"
                });
            return;
        }
        // Check if user already exists

        const foundUser = await userModel.findOne({ email });
        if (foundUser) {
            response.status(400).json(
                {
                    success: false,
                    error: "User Already Exists"
                });
            return;
        }
        const token = generateTokens(email);

        response.cookie("token", token, { maxAge: COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000, httpOnly: true, secure: process.env.NODE_ENV !== 'Development' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const User = new userModel({ fullName, email, password: hashedPassword });

        // save user to DB  
        await User.save();
        // console.log("User saved Successfully",savedUser);
        response.status(200).json(
            {
                success: true,
                message: "User Created Successfully"
            });
        return;
    } catch (error) {
        response.status(500).json(
            {
                success: false,
                error: `Error Adding User:${error}`
            }
        )
        return;
    }
}