const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/seats", require("./routes/seats"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/tickets", require("./routes/ticket"));

const mongoose = require("mongoose");

app.get("/api/health", (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
    res.json({ 
        status: "ok", 
        database: dbStatus,
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Server error" });
});

const port = process.env.PORT || 5002;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    });
