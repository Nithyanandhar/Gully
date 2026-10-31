import jwt from "jsonwebtoken"
import Users from "../models/Users.js";

const auth = async (req,res,next)=>{
    try{
        console.log("inside the auth")
        const {token} = req.cookies;
    
        console.log(req.cookies);
        const decode = jwt.verify(token , process.env.JWT_SIGN)

        const user = await Users.findById(decode.user_id)
        if(!user){
            throw new Error("User not Found");
        }

        req.user = user;
        next();
    }
    catch(error){
        res
            .status(400)
            .json({
                message : "You are not authenticated",
                from : "auth"
            })
    }
}

export default auth;