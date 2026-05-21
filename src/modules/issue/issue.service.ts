import { pool } from "../../db"
import { IssueInput } from "./issue.interface"

const createIssueIntoDb = async (payLoad: IssueInput) => {

    const { title, description, type, id } = payLoad
    const result = await pool.query(`
        INSERT INTO issues(title,description,type,reporter_id) VALUES($1,$2,$3,$4) RETURNING *
        `, [title, description, type, id])

    return result
}
const getAllIssuesFromDB = async (search: string) => {
    let searchSort = search
    // console.log(searchSort);
    
    // let result;
    let query = `SELECT * FROM issues`
    if (searchSort === "newest") {
        query += ` ORDER BY created_at DESC`
    } else if (searchSort === "oldest") {
        query += ` ORDER BY created_at ASC`
    }
    const issues = await pool.query(query)
    // console.log(issues.rows);
    
    const dataWithReporter = []

    for (const issue of issues.rows) {
        const reporter = await pool.query(
            `SELECT id, name, role FROM users WHERE id = $1`,
            [issue.reporter_id]
        )
        
        dataWithReporter.push({
            id: issue.id,
            title: issue.title,
            description: issue.description,
            type: issue.type,
            status: issue.status,
            reporter: reporter.rows[0] || null,
            created_at: issue.created_at,
            updated_at: issue.updated_at
        })
    }
    console.log(dataWithReporter);
    
    return dataWithReporter
    // if (searchSort === undefined) {
    //     result = await pool.query(`
    //     SELECT id, title, description, type, status, created_at, updated_at FROM issues
    //     `)
    // } else if (searchSort === "newest") {
    //     result = await pool.query(`
    //     SELECT id, title, description, type, status, SELECT (id, name, role) FROM users, created_at, updated_at FROM issues
    //     ORDER BY created_at DESC
    // `)
    // } else if (searchSort === "oldest") {
    //     result = await pool.query(`
    //     SELECT id, title, description, type, status, created_at, updated_at FROM issues
    //     ORDER BY created_at ASC
    // `)
    // }
}


export const issueService = {
    createIssueIntoDb,
    getAllIssuesFromDB
}