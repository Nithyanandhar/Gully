import Users from "../models/Users.js";

const userController = (req,res) => {
    try{
        const user = Users.findById(req.user.user_id);

        res
            .json({
                user : req.user,
                message: "user getting the details of himself"
            })
    }
    catch(error){
        res
            .json({
                message: `${error}`,
                from : "userController"
            })
    }
}


export default userController;