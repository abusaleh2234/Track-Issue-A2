import { Router } from "express"
import { issueController } from "./issue.controller"
const issueRouter = Router()

issueRouter.post("/", issueController.createIssue)

export default issueRouter