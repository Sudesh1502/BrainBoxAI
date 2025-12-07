import jwt from 'jsonwebtoken'
import User from '../modules/User.js';

export const protect = async(req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(400).json({error:"Anauthorized request made!"})
    }

    try {
        let decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decode.id).select("-password");
        next();
    } catch (err) {
        return res.status(500).json({error:"Something went wrong!"})
    }
}