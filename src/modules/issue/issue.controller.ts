import { Request, Response } from "express"
import sendResponse from "../../utils/sendResponse"
import { IssueInput } from "./issue.interface"
import { issueService } from "./issue.service"

const createIssue = async (req: Request, res: Response) => {
    // const token = req.headers.Authorization
    // console.log(req.body);
    
    try {
        
    // const {title, description,type} = req.body

    const result =await issueService.createIssueIntoDb(req.body)
        // console.log(result);
    const token = req.headers.authorization

    if (!token) {
        sendResponse(res,401,{success: false,message: "Unathorized"})
    }
    const issue = result.rows[0]
    sendResponse(res,201,{success:true, message: "Issue created successfully",data :issue})
    } catch (error: any) {
        sendResponse(res,500,{success:false,message: error.message, errors: error})
    }
    
}

export const issueController = {
    createIssue
}