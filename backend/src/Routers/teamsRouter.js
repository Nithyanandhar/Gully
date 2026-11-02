import express from "express";
import axios from "axios"
import Teams from "../models/Teams.js";

const teamsRouter = express.Router();

teamsRouter.get("/:team",async (req,res)=>{
    try{    
        const team = req.params.team;

        const key = `db:teams:${team}`

        const teamdbcache = await Teams.findOne({ key : key})
        if(teamdbcache){
            return res 
                .json({
                    data : teamdbcache.data,
                    from : "teamsRouter // retrived from db cache"

                })
        }
        const response = await axios.get(`https://api.cricketdatabase.com/v1/teams/${team}`, {
            headers: { Authorization: process.env.CRICKET_API },
        });

        const teamsdbdata = new Teams({
            key : key,
            data : response.data
        })

        teamsdbdata.save();
      
        res
            .json({
                data  : response.data,
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
