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
    // console.log(dataWithReporter);

    return dataWithReporter
}
const getSingleIssueFromDB = async (id: string | number) => {

    const issueResult = await pool.query(`
        SELECT * FROM issues WHERE id = $1
    `, [id])

    const issue = issueResult.rows[0]
    // console.log(issue);

    if (!issue) {
        return null
    }

    const reporterResult = await pool.query(`
        SELECT id, name, role 
        FROM users 
        WHERE id = $1
    `, [issue.reporter_id])
    // console.log(reporterResult.rows);

    const result = {
        id: issue.id,
        title: issue.title,
        description: issue.description,
        type: issue.type,
        status: issue.status,

        reporter: reporterResult.rows[0] || null,

        created_at: issue.created_at,
        updated_at: issue.updated_at
    }
    // console.log(result);

    return result
}
const updateIssueInDB = async (payLoad: IssueInput, user: { id: string, name: string, email: string, role: string }) => {
    const { title, description, type, id } = payLoad
    // console.log(title, description, type, id);

    const issue = await getSingleIssueFromDB(id)
    // console.log(user.id, "issue", issue?.reporter.id);

    if (user.role === "contributor" && user.id === issue?.reporter.id) {
        const result = await pool.query(`
    UPDATE issues
    SET 
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        type = COALESCE($3, type)
    WHERE id = $4
    RETURNING *
`, [title, description, type, id])
            console.log(result.rows[0])
        return result.rows[0]
    }
    if (user.role === "maintainer") {
        const result = await pool.query(`
    UPDATE issues
    SET 
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        type = COALESCE($3, type)
    WHERE id = $4
    RETURNING *
`, [title, description, type, id])
            console.log(result.rows[0])
        return result.rows[0]
    }else{
        throw new Error("This is not your issue")
    }

}
const deleteIssueFromDB = async (id: string) => {
    const result = await pool.query(
        `
    DELETE FROM issues WHERE id=$1  
      `,
        [id],
    );
    return result.rows[0];
}
export const issueService = {
    createIssueIntoDb,
    getAllIssuesFromDB,
    getSingleIssueFromDB,
    deleteIssueFromDB,
    updateIssueInDB
}