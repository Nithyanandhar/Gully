import express from "express"
import Matches from "../models/Matches.js";
import axios from "axios";
import cache from "../middleware/cache.js";

const matchRouter = express.Router();

matchRouter.get("/:match",async(req,res)=>{
    try{
        const match = req.params.match
        const key = `db:matches:${match}`;
        
        const dbmatches = await Matches.findOne({key : key})
        if(dbmatches){
            return res  
            .json({
                data : dbmatches,
                message : "data fetched from the matchRouter // DB CACHE"
            })
        }
        
        const response = await axios.get(`https://api.cricketdatabase.com/v1/matches/${match}`, {
            headers: { Authorization: process.env.CRICKET_API },
        });
        
        const fetchedMatches = response.data;
        
        const MatchSave = new Matches({
            key : key,
            data : fetchedMatches
        })
        
        await MatchSave.save();
        
        res
            .json({
                data : fetchedMatches,
                from : "Fetched from the API KEY // matchRouter"
        })
    }
    catch(error){
        res
            .json({
                error : error,
                from : "Unable to fetch the matches from the api"
        })
    }
})
matchRouter.get("/",cache(300),async(req,res)=>{

    try{
        
        const key = "db:matches";
        
        const dbmatches = await Matches.findOne({key : key})
        if(dbmatches){
            return res  
            .json({
                data : dbmatches,
                message : "data fetched from the matchRouter // DB CACHE"
            })
        }
        
        const response = await axios.get("https://api.cricketdatabase.com/v1/matches", {
            headers: { Authorization: process.env.CRICKET_API },
        });
        
        const fetchedMatches = response.data;
        
        const MatchSave = new Matches({
            key : key,
            data : fetchedMatches
        })
        
        await MatchSave.save();
        
        res
            .json({
                data : fetchedMatches,
                from : "Fetched from the API KEY // matchRouter"
        })
    }
    catch(error){
        res
            .json({
                error : error,
                from : "Unable to fetch the matches from the api"
        })
    }
})

export default matchRouter;