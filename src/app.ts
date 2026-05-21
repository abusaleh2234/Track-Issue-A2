import express, { NextFunction, Request, Response } from "express"
import authRouter from "./modules/user/user.route"
import issueRouter from "./modules/issue/issue.route"

const app = express()

app.use(express.json())

app.get("/", (req,res) => {
    res.status(200).json({
        success: true,
        message: "Track Issue on This Server"
    })
})

app.use("/api/auth",authRouter)
app.use("/api/issues", issueRouter)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app