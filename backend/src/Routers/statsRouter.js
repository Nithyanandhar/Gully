import axios from "axios";
import express from "express"
import cache from "../middleware/cache.js";

const statsRouter = express.Router();

statsRouter.post("/player", cache(24*60),async(req,res)=>{
    try{
        const player = req.body.player;
        const response = await axios.get(`https://api.cricketdatabase.com/v1/players/${player}/stats`,
            { headers: { Authorization: process.env.CRICKET_API },}
        )
        res
            .json({
                data : response.data,
                from : "statsRouter"
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