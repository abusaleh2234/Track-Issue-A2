import { pool } from "../../db"

const createIssueIntoDb = async (payLoad: { title: string, description: string, type: string }) => {

    const {title, description,type} = payLoad 
    const result = pool.query(`
        INSERT INTO issues(name, email, password, role) VALUES($1,$2,$3,$4) RETURNING *
        `, [])

    return result
}