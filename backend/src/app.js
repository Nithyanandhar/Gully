import express from "express";
import "dotenv/config.js"
import connectDB from "./config/db.js";
import authRouter from "./Routers/authRouter.js";
import cookieParser from "cookie-parser"
import cors from "cors";
import userRouter from "./Routers/userRouter.js";
import statsRouter from "./Routers/statsRouter.js";
import teamsRouter from "./Routers/teamsRouter.js";
import recordRouter from "./Routers/recordRouter.js";
import latestRouter from "./Routers/latestRouter.js";


const app = express();

app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser());
app.use(express.json());

app.use("/auth/",authRouter)
app.use("/getuser/",userRouter)
app.use("/stats/",statsRouter)
app.use("/teams/",teamsRouter)
app.use("/records/",recordRouter)
app.use("/",latestRouter)

connectDB()
    .then(()=>{
        app.listen(3000, ()=>{
            console.log("hello")
        })
    })
    .catch((error)=>{
        console.log("error while connecting to the DB", error)
    })