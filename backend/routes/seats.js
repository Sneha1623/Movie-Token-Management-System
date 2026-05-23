const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.get("/", async (req, res) => {
    const { movie, time } = req.query;

    if (!movie || !time) {
        return res.status(400).json({ message: "Movie and time are required" });
    }

    const bookings = await Booking.find({
        movie,
        time,
        status: "confirmed"
    }).select("seats");

    const bookedSeats = bookings.flatMap(booking => booking.seats);

    res.json({ bookedSeats });
});

module.exports = router;
