import mongoose from "mongoose";

const Records = new mongoose.Schema({
    key : {
        type : String,
        required : true,
        unique : true
    },
    data : {
        type : mongoose.Schema.Types.Mixed,
        required : true
    }
},{timestamps:true})

export default mongoose.model("Records",Records);