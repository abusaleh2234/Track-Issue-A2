import { Request, Response } from "express"
import { userService } from "./user.service"
import sendResponse from "../../utils/sendResponse";

const userRegister = async (req: Request, res: Response)=>{
    try {
        // const {name, email,password,role} = req.body

    const user = await userService.createUser(req.body)
    // console.log(user);
    
    sendResponse(res,201,{success: true, message: "User registered successfully",data:user.rows[0]})
    } catch (error : any) {
    sendResponse(res,500, {success:false, message: error.message, errors: error})
    }
    
}
const userLogin = async (req: Request, res: Response) => {
    try {
        const result =await userService.userLoginIntoDB(req.body)
        res.cookie("accessToken", result.token, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000  * 60 * 60 * 24
    })
        sendResponse(res,200,{success:true, message: "Login successful", data: result})
    } catch (error: any) {
        sendResponse(res,500,{success: false, message:error.message, errors: error})
    }
}
export  const userController = {
    userRegister,
    userLogin
}