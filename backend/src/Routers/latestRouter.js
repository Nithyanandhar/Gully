import express from "express";
import axios from "axios";
import cache from "../middleware/cache.js";

const latestRouter = express.Router();

latestRouter.get("/",cache(24*60), async (req,res)=>{
    try{

        const response = await axios.get("https://api.cricketdatabase.com/v1/results/yesterday", {
            headers: { Authorization: process.env.CRICKET_API },});

        res
            .json({
                data : response.data,
                message : error.message,
                from : "latestRouter"
            })
    }
    catch(error){
        res
            .json({
                message : error.message,
                from : "latestRouter"
            })
    }
})

export default latestRouter;