import express from "express";
import axios from "axios";
import cache from "../middleware/cache.js";

const recordRouter = express.Router();

recordRouter.post("/",cache(24*60),async(req,res)=>{
    try{
        const format = req.body.format;
        const type = req.body.type;

        const response = await axios.get(`https://api.cricketdatabase.com/v1/records?type=${type}&format=${format}`, {
                headers: { Authorization: process.env.CRICKET_API }, });

        res 
            .json({
                data : response.data,
                message : "Records retrived successfully",
                from : "recordRouter"
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