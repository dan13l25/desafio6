import express from "express";
import userManager from "../dao/manager/userManager.js";

const userRouter = express.Router();

userRouter.get("/login", userManager.getLogin);
userRouter.post("/login", userManager.login);
userRouter.get("/register", userManager.getRegister);
userRouter.post("/register", userManager.register);
userRouter.get("/logout", userManager.logOut);

export default userRouter;