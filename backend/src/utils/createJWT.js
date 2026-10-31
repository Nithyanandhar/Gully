import jwt from "jsonwebtoken";
import Users from "../models/Users.js";

const createJWT = async (userEmail) => {
    const user = await Users.findOne({email : userEmail});

    if(!user){
        return user;
    }
    const token = jwt.sign(
        {user_id : user._id},
        process.env.JWT_SIGN
    )
    return token;
}

export default createJWT;
