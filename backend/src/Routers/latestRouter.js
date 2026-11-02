import express from "express";
import axios from "axios";
import Latest from "../models/Latest.js";
import cache from "../middleware/cache.js";

const latestRouter = express.Router();

latestRouter.get("/", cache(300), async (req,res)=>{
    try{
        const key = "db:latest"

        const dblatest = await Latest.findOne({key : key})
        if(dblatest){
            return res
                    .json({
                        data : dblatest.data,
                        from : "retrived from the db"
                    })
        }
        const response = await axios.get("https://api.cricketdatabase.com/v1/results/yesterday", {
            headers: { Authorization: process.env.CRICKET_API },});
            
        const latestdata = new Latest({
            key : key,
            data : response.data
        })   

        latestdata.save();

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