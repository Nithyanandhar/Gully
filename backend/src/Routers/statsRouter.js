import axios from "axios";
import express from "express";
import Stats from "../models/Stats.js";

const statsRouter = express.Router();

statsRouter.post("/player", async(req,res)=>{
    try{
        const player = req.body.player;

        const key = `db:stats:${player}`

        const dbcache =await Stats.findOne({key : key})
        if(dbcache){
            return res
                    .json({
                        data : dbcache.data,
                        from : "statsRouter / from DB CACHE"
                    })
        }
        const response = await axios.get(`https://api.cricketdatabase.com/v1/players/${player}/stats`,
            { headers: { Authorization: process.env.CRICKET_API },}
        )

        const statsres = new Stats({
            key : key,
            data : response.data 
        })
        statsres.save();
        res
            .json({
                data : response.data,
                from : "statsRouter // FROM API REQ"
            })
    }
    catch(error){
        res
            .json({
                message : `${error}`,
                from : "statsRouter"
            })
    }
    
})

export default statsRouter;