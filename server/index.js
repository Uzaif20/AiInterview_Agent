import express, { json } from "express"
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import { googleAuth } from "./controllers/auth.controller.js";
dotenv.config()

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", googleAuth)

const PORT = process.env.PORT || 8000

app.listen(PORT , () => {
    console.log(`Server running on ${PORT}`)
    connectDB()
})