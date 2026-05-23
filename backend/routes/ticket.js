const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const requireLogin = require("../middleware/auth");

// GET LOGGED IN USER TICKETS
router.get("/my", requireLogin, async (req, res) => {
    const tickets = await Ticket.find({ userId: req.user._id })
        .sort({ createdAt: -1 });

    res.json({ tickets });
});

// GET ONE LOGGED IN USER TICKET
router.get("/:ticketId", requireLogin, async (req, res) => {
    const ticket = await Ticket.findOne({
        _id: req.params.ticketId,
        userId: req.user._id
    });

    if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({ ticket });
});

module.exports = router;
