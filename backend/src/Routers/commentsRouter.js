import axios from "axios";
import express from "express"
import Comments from "../models/Comments.js"

const commentsRouter = express.Router();

commentsRouter.get("/:roomId",async(req,res)=>{
    try{
        const roomId = req.params.roomId;
        const comments = await Comments.find({roomId : roomId})
        if(!comments){
            return res.json({message : "data not found"})
        }
        return res.json({
            data : comments
        })
    }
    catch(error){
        res.json({
            error : error
        })
    }
})

export default commentsRouter;