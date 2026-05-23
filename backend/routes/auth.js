const express = require("express");
const router = express.Router();
const User = require("../models/User");
const requireLogin = require("../middleware/auth");
const { createSessionToken, hashPassword, verifyPassword } = require("../utils/password");

function publicUser(user) {
    return {
        _id: user._id,
        name: user.name,
        mobile: user.mobile,
        email: user.email
    };
}

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { name, mobile, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const sessionToken = createSessionToken();
        const user = new User({
            name,
            mobile,
            email,
            passwordHash: hashPassword(password),
            sessionToken
        });

        await user.save();

        res.status(201).json({
            message: "User registered",
            user: publicUser(user),
            token: sessionToken
        });
    } catch (err) {
        res.status(500).json({ message: "Registration failed" });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

        const hasValidPassword = user && (
            verifyPassword(password, user.passwordHash) ||
            user.password === password
        );

        if (!hasValidPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (user.password === password) {
            user.passwordHash = hashPassword(password);
            user.password = undefined;
        }

        user.sessionToken = createSessionToken();
        await user.save();

        res.json({
            message: "Login successful",
            user: publicUser(user),
            token: user.sessionToken
        });
    } catch (err) {
        res.status(500).json({ message: "Login failed" });
    }
});

router.get("/me", requireLogin, (req, res) => {
    res.json({ user: publicUser(req.user) });
});

router.post("/logout", requireLogin, async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { sessionToken: null });
    res.json({ message: "Logged out" });
});

module.exports = router;
