import { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import { tokenVerify } from "../utils/tokenVerify";
import { userService } from "../modules/user/user.service";

export const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {        
        const token = req.cookies.accessToken
        // console.log(token);
        
        if (!token) {
            throw new Error("Unauthorized")
            // sendResponse(res, 401, { success: false, message: "Unauthorized",errors: ""})
        }
        const payLoad = tokenVerify(token as string)
        // console.log(payLoad, "as a err");
        
        if (!payLoad) {
            throw new Error("Invalid access token")
            // sendResponse(res, 401, { success: false, message: "Invalid access token" })
        }
        const user = await userService.getUserById(payLoad.id)

        if (!user) {
            throw new Error("User not found")
            // return sendResponse(res, 404, { success: false, message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}