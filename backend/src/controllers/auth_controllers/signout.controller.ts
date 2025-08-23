import { Request, Response } from "express";
import { SignupRequestBody } from "../../lib/interfaces";


export const signout = async (request: Request<{}, {}, SignupRequestBody>, response: Response) => {
    try {
        response.cookie("token", "", { maxAge: 0, httpOnly: true, secure: process.env.NODE_ENV !== "Development" });
        response.status(200).json(
            {
                success: true,
                message: "Signed out successfully"
            })
        return;
    } catch (error) {
        response.status(500).json(
            {
                success: false,
                error: "Error signing out"
            })
        return;
    }

}
