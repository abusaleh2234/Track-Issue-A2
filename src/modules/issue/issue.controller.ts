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
        const { title, description, type } = req.body
        const { id } = req.user
        const result = await issueService.createIssueIntoDb({ title, description, type, id })
        const issue = result.rows[0]
        // console.log(result);
        // console.log(token);

        sendResponse(res, 201, { success: true, message: "Issue created successfully", data: issue })
    } catch (error: any) {
        sendResponse(res, 500, { success: false, message: error.message, errors: error })
    }

}
const getAllIssues = async (req: Request, res: Response) => {
    try {
        const sort = req.query.sort as string
        const result = await issueService.getAllIssuesFromDB(sort)
        sendResponse(res, 200, { success: true, message: "Issues retrieved successfully", data: result })
    } catch (error) {
        sendResponse(res, 500, { success: false, message: "Issues not Found" })
    }
}
const getSingleIssues = async (req: Request, res: Response) => {
    try {
        // console.log(req.params);
        const id= req.params.id as string
        const result = await issueService.getSingleIssueFromDB(id) 
        sendResponse(res, 200, {success: true, data: result})
    } catch (error) {
        sendResponse(res, 500,{success:false, message: "Issue not Found"})
    }
}
const updateIssue  = async (req: Request, res: Response) => {
    try {
        const {title, description, type} = req.body
        const { id } = req.params as { id: string }
        const user = req.user        
        const result = await issueService.updateIssueInDB({title, description, type, id},user)

        sendResponse(res,200, {success: true, message: "Issue updated successfully", data: result})
    } catch (error: any) {
        sendResponse(res,500,{success:false, message: error.message})
    }
}
const deleteIssue = async (req: Request, res: Response) => {
    try {
        const  user = req.user
        
        const id= req.params.id as string
        if (user.role !== "maintainer") {
            throw new Error("Maintainer only Delete Issue")
        }
        const result = await issueService.deleteIssueFromDB(id)
        sendResponse(res,200, {success: true , message: "Issue deleted successfully"})
    } catch (error: any) {
        sendResponse(res,500,{success:false,message:error.message})
    }
}
export const issueController = {
    createIssue,
    getAllIssues,
    getSingleIssues,
    deleteIssue,
    updateIssue
}