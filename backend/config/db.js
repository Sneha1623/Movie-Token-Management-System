const mongoose = require("mongoose");

const mongoUri =
    process.env.MONGO_URI ||
    "mongodb://127.0.0.1:27017/movieBooking";

async function connectDB() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000, // Increase timeout to 10s
        });
        console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err.message);
        if (err.message.includes("ETIMEOUT")) {
            console.error("Tip: Check your internet connection and ensure your IP is whitelisted in MongoDB Atlas.");
        }
        throw err;
    }
}

module.exports = connectDB;
