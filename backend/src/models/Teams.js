import mongoose from "mongoose";

const Teams = new mongoose.Schema({
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

export default mongoose.model("Teams",Teams);