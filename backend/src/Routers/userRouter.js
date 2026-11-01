import express from "express";
import userController from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import cache from "../middleware/cache.js";

const userRouter = express.Router();

userRouter.get("/user",auth,cache(300),userController);

export default userRouter;