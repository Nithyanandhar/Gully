import express from "express";
import axios from "axios";
import Records from "../models/Records.js";

const recordRouter = express.Router();

recordRouter.post("/",async(req,res)=>{
    try{
        const format = req.body.format || "any"; //  test , odi , t20 ,multi-day ,one-day
        const type = req.body.type || "any" ;  //  most-runs, most-wickets, highest-scores, best-bowling,team-totals
        const gender = req.body.gender || "any"   // male ,female, any

        const key = `db:records:${format}:${type}:${gender}`

        const dbdata = await Records.findOne({ key : key })
        if(dbdata){
            return res 
                .json({
                    data : dbdata,
                    message : "Records retrived successfully",
                    from : "recordRouter // RETRIEVED FROM THE DB CACHE"
                })
        }
        const response = await axios.get(`https://api.cricketdatabase.com/v1/records?type=${type}&format=${format}&gender=${gender}`, {
                headers: { Authorization: process.env.CRICKET_API }, });

        const recordsData = new Records({
            key : key,
            data : response.data
        })

        await recordsData.save();
        return res 
            .json({
                data : response.data,
                message : "Records retrived successfully",
                from : "recordRouter // RETRIEVED FROM THE API"
            })
        
    }
    catch(error){
        res 
            .json({
                data : error.message ,
                message : "Error retrieving the Records data",
                from : "recordRouter"
            })
        
    }
})


export default recordRouter;