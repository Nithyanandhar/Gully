import axios from "axios";
import express from "express";
import Stats from "../models/Stats.js";
import playerData from "../services/playerData.js";
import cache from "../middleware/cache.js";

const statsRouter = express.Router();

statsRouter.get("/:player", async(req,res)=>{
    try{
        const player = req.params.player;
        
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
statsRouter.get("/", async(req,res)=>{
    try{
        const players=await  playerData();

        res
            .json({
                data:players,
                from : "statsRouter // playerData.js"
            }) 
        }
        catch(error){
            res
                .json({
                    message : error.message,
                    from : "statsRouter // playerData.js"
                }) 
            
    }
})

export default statsRouter;