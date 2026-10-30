import mongoose from "mongoose";

const Users = mongoose.Schema({
    username : {
        type : String,
        unique : true,
        minLength : 4,
        trim : true
    },
    profileURL :{
        type : String,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgM5LsZuRCVShbeXJMnm-cgvCGyDvvDG6a_ZdJKWy-5kc17r_n53WMsqEL&s=10"
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    password : {
        type : String,
        minLength : 4,
        trim : true
    }
},{timestamps : true})

export default mongoose.model("Users",Users);