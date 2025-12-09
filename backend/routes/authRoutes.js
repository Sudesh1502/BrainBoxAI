import express from 'express'
import { loginUser, logout, registerUser, verifyMe } from '../utils/user.controller.js';
import { protect } from '../utils/middlewares.js';
import jwt from 'jsonwebtoken'
import { OAuth2Client } from "google-auth-library";
import User from '../modules/User.js';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const userRouter = express.Router();


// Google Login
userRouter.post("/google", async (req, res) => {
    try {
        const { token } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name} = payload;

        // check if user exists
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                password: "google-oauth",
            });
        }

        // Create your JWT cookie
        const jwtToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: true, // local = false, production https = true
            sameSite: "none",
        });

        res.json({ message: "Google login successful!" });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: "Google authentication failed!" });
    }
});




userRouter.post("/signup", registerUser);
userRouter.post("/signin", loginUser);
userRouter.post("/logout", logout);
// authRoutes.js
userRouter.get("/me", protect, verifyMe)

userRouter.post("/me", protect, verifyMe);


export default userRouter;