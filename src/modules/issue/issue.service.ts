import { pool } from "../../db"
import { IssueInput } from "./issue.interface"

const createIssueIntoDb = async (payLoad: IssueInput) => {

    const {title, description,type,id} = payLoad 
    const result = await pool.query(`
        INSERT INTO issues(title,description,type,reporter_id) VALUES($1,$2,$3,$4) RETURNING *
        `, [title,description,type,id])

    return result
}



export const issueService = {
    createIssueIntoDb,
}