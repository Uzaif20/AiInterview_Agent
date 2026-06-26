import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/connectDB.js";

dotenv.config()

const app = express();

const PORT = process.env.PORT || 8000

app.get("/" , (req, res) => {
    return res.json({msg: "server started"});
})

app.listen(PORT , () => {
    console.log(`Server running on ${PORT}`)
    connectDB()
})