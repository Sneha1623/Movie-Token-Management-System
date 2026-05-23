const User = require("../models/User");

async function requireLogin(req, res, next) {
    try {
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

        if (!token) {
            return res.status(401).json({ message: "Login required" });
        }

        const user = await User.findOne({ sessionToken: token }).select("_id name email mobile");

        if (!user) {
            return res.status(401).json({ message: "Invalid or expired login" });
        }

        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = requireLogin;
