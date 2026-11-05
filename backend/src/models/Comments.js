import mongoose from "mongoose";

const Comments = new mongoose.Schema({
    roomId : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    sender : {
        type : String,
        ref : "Users",
        required : true
    }
},{timestamps : true})

export default mongoose.model("Comments",Comments);