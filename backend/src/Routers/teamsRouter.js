import express from "express";
import axios from "axios"
import cache from "../middleware/cache.js";

const teamsRouter = express.Router();

teamsRouter.get("/:team",cache(24*60),async (req,res)=>{
    try{    
        const team = req.params.team;
        const response = await axios.get(`https://api.cricketdatabase.com/v1/teams/${team}`, {
            headers: { Authorization: process.env.CRICKET_API },
        });
      
        res
            .json({
                data  : response.data.data,
                message : "Retrived from api",
                from : "teamsRouter"
            })

    }catch(error){
        res
            .json({
                message : error.message,
                from : "teamsRouter"
            })
    }
})

teamsRouter.get("/",async (req,res)=>{
    try{    

        const response = await axios.get("https://api.cricketdatabase.com/v1/teams", {
            headers: { Authorization: process.env.CRICKET_API },
        });

        res
            .json({
                data  : response.data.data,
                message : "Retrived from api",
                from : "teamsRouter"
            })

    }catch(error){
        res
            .json({
                message : error.message,
                from : "teamsRouter"
            })
    }
})

export default teamsRouter;
