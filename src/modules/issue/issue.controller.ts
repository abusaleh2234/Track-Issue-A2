import { Request, Response } from "express"
import sendResponse from "../../utils/sendResponse"
import { IssueInput } from "./issue.interface"
import { issueService } from "./issue.service"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../../config"

const createIssue = async (req: Request, res: Response) => {
    // const token = req.headers.Authorization
    // console.log(req.body);

    try {
        const {title, description,type} = req.body
        const {id } = req.user
        const result = await issueService.createIssueIntoDb({title, description,type,id})
        const issue = result.rows[0]
        // console.log(result);
        // console.log(token);

        sendResponse(res, 201, { success: true, message: "Issue created successfully", data: issue })
    } catch (error: any) {
        sendResponse(res, 500, { success: false, message: error.message, errors: error })
    }

}

export const issueController = {
    createIssue
}