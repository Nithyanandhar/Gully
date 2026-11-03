import express from "express";
import axios from "axios"
import Venue from "../models/Venue.js";
import cache from "../middleware/cache.js";

const venueRouter = express.Router();

venueRouter.get("/",cache(300),async(req,res)=>{
    try{
        const key = "db:venues"
        const dbvenue = await Venue.findOne({key : key})

        if(dbvenue){
            return res  
                .json({
                    data : dbvenue,
                    message  : "from the db Venue"
                })
            }
            
            const response = await axios.get("https://api.cricketdatabase.com/v1/venues", {
                headers: { Authorization: process.env.CRICKET_API },
            });
            
            const Venues = response.data;
            
            const dbCacheVenue = new Venue({
                key : key,
                data : Venues
            })
            await dbCacheVenue.save();
            return res  
                .json({
                    data : Venues.data,
                    message  : "from the api call"
                })

    }
    catch(error){
        res
            .json({
                message : error.message,
                message : "error from the venueRouter :// venues"
            })
        }
    })


    venueRouter.get("/:venue",async(req,res)=>{
        try{
            const venue = req.params.venue
    
            const key = `db:venues:${venue}`

            const dbvenue = await Venue.findOne({key : key});
             
            if(dbvenue){
                return res  
                    .json({
                        data : dbvenue.data,
                        from : "venueRouter :// from the db cache"
                    })
            }

            const response = await axios.get(`https://api.cricketdatabase.com/v1/venues/${venue}`, {
                    headers: { Authorization: process.env.CRICKET_API },
                });
            
            const venueDetails = response.data;

            const dbCacheVenue = new Venue({
                key : key,
                data : venueDetails
            })

            await dbCacheVenue.save();


            res
                .json({
                    data : venueDetails,
                    from : "error from the venueRouter // :venue // api calls"
                })
            
        }
        catch(error){
            res
                .json({
                    message : error.message,
                    from : "error from the venueRouter // :venue"
                })
    }

})

export default venueRouter;