import { Response,Request } from "express";
import { SignupRequestBody } from "../lib/interfaces";

export const updateUser = async (request: Request<{}, {}, SignupRequestBody>, response: Response) => {
    try {

    } catch (error) {
        response.status(500).json(
            {
                success: false,
                error: `Internal Server Error : ${error}`
            })
        return;
    }
}
