import express from "express";
import dotenv from "dotenv";
 import connectDB from "./config/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Server is working!");
});

 app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);


const PORT = process.env.PORT || 8080;

await connectDB();

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});