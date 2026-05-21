import dotenv from "dotenv"

dotenv.config()

const config = {
    port: process.env.PORT as string,
    connectionString: process.env.CONNECTIONSTRING as string,
    accessSecret: process.env.ACCESSSECRET as string
}

export default config