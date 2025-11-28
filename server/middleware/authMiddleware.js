import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// verify the user
const verifyUser = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                error: "No authorization header provided",
            });
        }

        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(404).json({
                success: false,
                error: "Invalid token"
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_KEY
        );

        if (!decoded || !decoded.id) {
            return res.status(404).json({
                success: false,
                error: "Invalid or expired token"
            });
        }

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            // if user does not exist
            return res.status(404).json({
                success: false,
                error: "User does not exist"
            })
        }

        req.user = user;
        next();

    } catch (error) {
        // check the token -> pass from frontend
        console.error("Auth Middleware error: ", error);
        return res.status(500).json({
            success: false,
            error: "Server Error: " + error.message
        })
    }
}

export default verifyUser;