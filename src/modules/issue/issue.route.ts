import { Router } from "express"
import { issueController } from "./issue.controller"
import { userAuth } from "../../middleware/auth"
const issueRouter = Router()

issueRouter.post("/",userAuth, issueController.createIssue)
issueRouter.get("/",issueController.getAllIssues)
issueRouter.get("/:id",issueController.getSingleIssues)
issueRouter.patch("/:id",userAuth, issueController.updateIssue)
issueRouter.delete("/:id",userAuth,issueController.deleteIssue)
export default issueRouter