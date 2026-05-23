const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");
const Ticket = require("../models/Ticket");
const requireLogin = require("../middleware/auth");

function makeTicketToken() {
    return `T${Date.now().toString().slice(-6)}${Math.floor(100 + Math.random() * 900)}`;
}

async function getAlreadyBookedSeats(movie, time, seats) {
    const bookings = await Booking.find({
        movie,
        time,
        status: "confirmed",
        seats: { $in: seats }
    }).select("seats");

    const alreadyBooked = new Set();

    bookings.forEach(booking => {
        booking.seats.forEach(seat => {
            if (seats.includes(seat)) {
                alreadyBooked.add(seat);
            }
        });
    });

    return Array.from(alreadyBooked);
}

router.post("/", requireLogin, async (req, res) => {
    try {
        const { movie, time, seats, totalPrice, paymentMethod, paymentDetails } = req.body;

        if (!movie || !time || !Array.isArray(seats) || seats.length === 0) {
            return res.status(400).json({ message: "Movie, time and seats are required" });
        }

        if (!paymentMethod || !paymentDetails) {
            return res.status(400).json({ message: "Payment method and details are required" });
        }

        const alreadyBookedSeats = await getAlreadyBookedSeats(movie, time, seats);

        if (alreadyBookedSeats.length > 0) {
            return res.status(409).json({
                message: "Some seats are already booked",
                seats: alreadyBookedSeats
            });
        }

        const booking = await Booking.create({
            userId: req.user._id,
            movie,
            time,
            seats,
            totalPrice: Number(totalPrice || 0)
        });

        const payment = await Payment.create({
            userId: req.user._id,
            bookingId: booking._id,
            amount: Number(totalPrice || 0),
            method: paymentMethod,
            details: paymentDetails,
            transactionId: crypto.randomBytes(8).toString("hex").toUpperCase()
        });

        const ticket = await Ticket.create({
            userId: req.user._id,
            bookingId: booking._id,
            movie,
            time,
            seats,
            totalPrice: Number(totalPrice || 0),
            paymentMethod,
            token: makeTicketToken()
        });

        res.status(201).json({
            message: "Booking confirmed",
            booking,
            payment,
            ticket
        });
    } catch (err) {
        res.status(500).json({ message: "Booking failed" });
    }
});

router.get("/my", requireLogin, async (req, res) => {
    const bookings = await Booking.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ bookings });
});

module.exports = router;
