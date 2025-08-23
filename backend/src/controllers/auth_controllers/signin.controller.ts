import { Request, Response } from "express";
import { SignupRequestBody } from "../../lib/interfaces";
import userModel from "../../models.ts/user.model";
import bcrypt from "bcryptjs"
import { generateTokens } from "../../lib/utils";
import { COOKIE_EXPIRY_DAYS } from "../../lib/constants";

export const signin = async (request: Request<{}, {}, SignupRequestBody>, response: Response) => {
    try {
        const { email, password } = request.body;

        // all field are required
        if (!email || !password) {
            response.status(400).json(
                {
                    success: false,
                    error: "All fields are required"
                });
            return;
        }
        const user = await userModel.findOne({ email });
        // user not found
        if (!user) {
            response.status(400).json(
                {

                    success: false,
                    error: "Invalid Credentials"
                });
            return;
        }
        const hashedPassword = user.password;
        if (!hashedPassword) {
            response.status(500).json(
                {
                    success: false,
                    error: "Password not set for the user"
                });
            return;
        }
        const validPassword = await bcrypt.compare(password, hashedPassword);
        if (!validPassword) {
            response.status(400).json(
                {
                    success: false,
                    error: "Invalid Credentials"
                });
            return;
        }
        const token = generateTokens(email);

        response.cookie("token", token, { maxAge: COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000, httpOnly: true, secure: process.env.NODE_ENV !== "Development" });
        response.status(200).json(
            {
                success: true,
                message: "User Signed in Successfully"
            });
        return;
    } catch (error) {
        console.error(`Error signing in user: ${error}`);
        response.status(500).json(
            {
                success: false,
                error: "Internal Server Error"
            });
        return;
    }
}