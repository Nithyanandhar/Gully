import express from "express";
import createJWT from "../utils/createJWT.js";
import validator from "validator"
import Users from "../models/Users.js";
import bcrypt from "bcrypt"

const authRouter = express.Router();

authRouter.post("/signup",async (req,res)=>{
    try{

        let username = String(req.body.username ?? "").trim();
        let userEmail = String(req.body.email ?? "").trim();
        let password = String(req.body.password ?? "").trim();

        if(await Users.findOne({email : userEmail})){
            return res 
                .status(409)
                .json({
                    message : "User email already exist",
                    from : "authRouter / signup"
                })
        }
        if(await Users.findOne({username : username})){
            return res 
                .status(409)
                .json({
                    message : "Username already exist",
                    from : "authRouter / signup"
                })
        }
        if(!validator.isEmail(userEmail)){
            return res
                .status(400)
                .json({
                    message : "Email is not valid",
                    from : "authRouter /signup middleware"
                })
        }
        if(!validator.isStrongPassword(password)){
            return res
                .status(400)
                .json({
                    message : "Weak Password",
                    from : "authRouter /signup middleware"
                })
        }

        const encryptedpass = await bcrypt.hash(password,10);

        const user = new Users({
            username : username,
            email : userEmail,
            password : encryptedpass
        })
        user.save();


        const token = createJWT(userEmail);
        if(!token){
            return res
                .status(404)
                .json({
                    message : "User not found(maybe from createJWT)",
                    from : "createJWT"
                })
        }


        return res
                .cookie("auth",token,"1h")
                .json({
                    message : "Signned in successfully"
                })
    }
    catch(error){
        res
            .json({
                message : `${error}`,
                from : "authRouter/signup"
            })
    }
})

authRouter.post("/login",async (req,res)=>{
    try{
        const userEmail = req.body.email;
        const password = req.body.password;
        if(!(userEmail || password)){
            return res
                .json({
                    message : "email or password is empty",
                    from : "authRouter/login"
                })
        }
        const user = await Users.findOne({email : req.body.email});
        const isValidpassword = bcrypt.compare(user.password, password);

        if(!isValidpassword){
            return res
                .json({
                    message : "password is not valid",
                    from : "authRouter/login"
                })
        }

        const token = await createJWT(user.email);
        console.log(token)
        res
            .cookie("auth",token,"1h")
            .json({
                message : "loggin successsful",
                from : "authRouter"
            })

    }
    catch(error){
        res
            .json({
                message : `${error}`,
                from : "authRouter/login"
            })
    }
})

export default authRouter;