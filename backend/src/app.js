import express from "express";
import "dotenv/config.js"
import connectDB from "./connection/db.js";
import authRouter from "./Routers/authRouter.js";
import cookieParser from "cookie-parser"

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/auth/",authRouter)

connectDB()
    .then(()=>{
        app.listen(3000, ()=>{
            console.log("hello")
        })
    })
    .catch((error)=>{
        console.log("error while connecting to the DB", error)
    })