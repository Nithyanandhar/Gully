import mongoose from "mongoose";

const Stats = new mongoose.Schema({
    key : {
        type : String,
        required : true,
        unique :true
    },
    data : {
        type : Object,
        required : true
    }
},{timestamps : true})

export default mongoose.model("Stats",Stats);