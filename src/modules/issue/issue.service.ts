import { pool } from "../../db"
import { IssueInput } from "./issue.interface"

const createIssueIntoDb = async (payLoad: IssueInput) => {

    const {title, description,type} = payLoad 
    const result = await pool.query(`
        INSERT INTO issues(title,description,type) VALUES($1,$2,$3) RETURNING *
        `, [title,description,type])

    return result
}

export const issueService = {
    createIssueIntoDb
}