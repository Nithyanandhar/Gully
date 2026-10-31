import express from "express";
import "dotenv/config.js"
import connectDB from "./connection/db.js";
import authRouter from "./Routers/authRouter.js";
import cookieParser from "cookie-parser"
import homeRouter from "./Routers/homeRouter.js";
import cors from "cors";
import userRouter from "./Routers/userRouter.js";


const app = express();

app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser());
app.use(express.json());

app.use("/auth/",authRouter)
app.use("/getuser/",userRouter)
app.use("/",homeRouter)

connectDB()
    .then(()=>{
        app.listen(3000, ()=>{
            console.log("hello")
        })
    })
    .catch((error)=>{
        console.log("error while connecting to the DB", error)
    })