const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    movie: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: String,
        required: true,
        trim: true
    },
    seats: [{
        type: String,
        required: true
    }],
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ["confirmed", "cancelled"],
        default: "confirmed"
    }
}, { timestamps: true });

BookingSchema.index({ movie: 1, time: 1, status: 1 });

module.exports = mongoose.model("Booking", BookingSchema);
