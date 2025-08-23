import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { z } from "zod";

const PayloadSchema = z.object({
    email: z.string()
});
export interface AuthenticatedRequest extends Request {
    email: string;
}

export const auth = (request: Request, response: Response, next: NextFunction) => {
    try {
        const authReq = request as AuthenticatedRequest;
        const token = authReq.cookies.token;
        if (!token) {
            response.status(401).json(
                {
                    success: false,
                    error: "Token not found"
                });
            return;
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            response.status(500).json(
                {
                    success: false,
                    error: "JWT_SECRET Missing"
                });
            return;
        }
        const parsed = jwt.verify(token, secret);
        const result = PayloadSchema.safeParse(parsed);
        if (!result.success) {
            throw new Error("Invalid token payload");
        }
        const email = result.data.email;
        authReq.email = email;
        next();
    } catch (error) {
        console.log("Error on the server:", error)
        response.status(500).json(
            {
                success: false,
                error: "Internal Server Error"
            });
        return;
    }
}