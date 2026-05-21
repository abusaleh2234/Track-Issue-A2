import config from "../../config";
import { pool } from "../../db";
import { CUser } from "./user.interface";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createUser = async (payLoad: CUser) => {
    const { name, email, password, role } = payLoad;

    const hashPass = await bcrypt.hash(password, 10)

    const result = await pool.query(`
        INSERT INTO users(name, email, password, role) VALUES($1,$2,$3,$4) RETURNING *
        `, [name, email, hashPass, role])

    delete result.rows[0].password;
    return result
}
const userLoginIntoDB = async (payLoad: { email: string, password: string }) => {
    const { email, password } = payLoad
    // user exist
    const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [email])

    if (userData.rows.length === 0) {
        throw new Error("Invalid User Data!");
    }
    // compare password
    const user = userData.rows[0]

    const matchPassword = await bcrypt.compare(password, user.password)
    if (!matchPassword) {
        throw new Error("Invalid Credentials!")
    }

    // token
    const jwtPayLoad = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }
    const accessToken = jwt.sign(jwtPayLoad, config.accessSecret, { expiresIn: "1d" })
    return { accessToken, user }
}

const getUserById = async (userId: string) => {
    const result = await pool.query(`
    SELECT id, name, email, role
    FROM users
    WHERE id = $1
`, [userId]);
    return result.rows[0];
}
export const userService = {
    createUser,
    userLoginIntoDB,
    getUserById
}