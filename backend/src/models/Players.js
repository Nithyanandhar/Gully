import mongoose from "mongoose";

const Players = mongoose.Schema({
    key : {
        type : String,
        required: true,
        unique : true
    },
    data : {
        type : Object,
        required: true
    }
})

export default mongoose.model("Players",Players);