import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../modules/User.js'





const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists with this email!" });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashed
        });


        res.status(201).json({ message: "Registration successful!" });

    } catch (err) {
        // console.log(err + "\n failed to create new user");
        res.status(500).json({ error: "something went wrong, failed to create new user." });
    }
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "No user found with this email!" })
        let isFound = await bcrypt.compare(password, user.password);
        if (!isFound) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }

        let token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,       // must be false on localhost
            sameSite: "none",     // allow cookies between ports
            path: "/",           // IMPORTANT: allow cookie on all routes
        });
        return res.status(200).json({
            message: "Login sucessful",
            token
        })
    } catch (err) {
        res.status(500).json({ error: "something went wrong" });
    }
}


const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,           // must match login cookie
            sameSite: "none",
            path: "/",
        });

        return res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        return res.status(500).json({ error: "Failed to logout" });
    }
}




//this route is for varifing bthe front end routes
const verifyMe = (req, res) => {
    return res.status(200).json({
        user: req.user,
        message: "Authenticated"
    });
}

export { registerUser, loginUser, logout, verifyMe };