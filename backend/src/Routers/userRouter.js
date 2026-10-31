import express from "express";
import userController from "../controllers/userController.js";
import auth from "../utils/auth.js";

const userRouter = express.Router();

userRouter.get("/user",auth,userController);

export default userRouter;