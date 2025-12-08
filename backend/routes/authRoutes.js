import express from 'express'
import { loginUser, logout, registerUser, verifyMe } from '../utils/user.controller.js';
import { protect } from '../utils/middlewares.js';

const userRouter = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/signin", loginUser);
userRouter.post("/logout", logout);
// authRoutes.js
userRouter.get("/me",protect, verifyMe);


export default userRouter;