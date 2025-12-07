import express from 'express'
import { loginUser, logout, registerUser } from '../utils/user.controller.js';

const userRouter = express.Router();

userRouter.post("/signin", registerUser);
userRouter.post("/signup", loginUser);
userRouter.post("/logout", logout);

export default userRouter;