import { Router } from "express"; 
import app from "../../app";
import { userController } from "./user.controller";

const authRouter = Router()
authRouter.post("/signup",userController.userRegister)
authRouter.post("/login",userController.userLogin)


export default authRouter