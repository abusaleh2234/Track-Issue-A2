import { Router } from "express"
import { issueController } from "./issue.controller"
import { userAuth } from "../../middleware/auth"
const issueRouter = Router()

issueRouter.post("/",userAuth, issueController.createIssue)
issueRouter.get("/",issueController.getAllIssues)
export default issueRouter