import express from "express"
import authRouter from "./modules/user/user.route"

const app = express()

app.use(express.json())

app.get("/", (req,res) => {
    res.status(200).json({
        success: true,
        message: "Track Issue on This Server"
    })
})

app.use("/api/auth",authRouter)
app.use("/api/issues", )

export default app