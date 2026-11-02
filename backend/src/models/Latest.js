import mongoose from "mongoose";

const Latest = new mongoose.Schema({
    key : {
        type : String,
        required : true,
        unique : true
    },
    data : {
        type : Object,
        required : true
    }
})

export default mongoose.model("Latest",Latest);