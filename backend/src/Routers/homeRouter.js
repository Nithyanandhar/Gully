import express from "express";

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