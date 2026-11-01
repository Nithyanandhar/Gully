import express from "express";
import cache from "../middleware/cache.js";

const homeRouter = express.Router();

homeRouter.get("/feed",(req,res)=>{
    try{

        res 
            .json({
                message : "hello from homeRouter"
            })
    }
    catch(error){
        res 
            .json({
                message : `${error}`,
                from : "homeRouter/feed"
            })
    }
});

export default homeRouter;