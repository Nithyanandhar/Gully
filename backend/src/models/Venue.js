import mongoose from "mongoose";

const Venue = new mongoose.Schema({
    key : {
        type : String,
        required : true
    },
    data : {
        type : Object,
        required : true
    }
}, {timestamps : true});

export default mongoose.model("Venue",Venue);