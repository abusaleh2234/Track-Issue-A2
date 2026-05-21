import { Pool } from "pg"
import config from "../config"

export const pool = new Pool({
    connectionString: config.connectionString
})

export const initDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR,
            email VARCHAR(200) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            
            role VARCHAR(20) NOT NULL DEFAULT 'contributor' CHECK (role IN ('contributor', 'maintainer')),
            

            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `)

        await pool.query(`
            CREATE TABLE IF NOT EXISTS issues(
            id SERIAL PRIMARY KEY,
            title VARCHAR(150),
            description VARCHAR,
            type VARCHAR(20) CHECK (type IN ('feature_request', 'bug')),
            status VARCHAR(20) NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved')),
            reporter_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,

            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            CHECK (LENGTH(description) >= 20)
            )
            `)

        console.log("DB is Connect SuccessFully");
        // CHECK (role IN ('contributor', 'maintainer')),
    } catch (error) {
        console.log(error);

    }
}