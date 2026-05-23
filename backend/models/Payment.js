const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    method: {
        type: String,
        required: true,
        enum: ["UPI", "Card", "Net Banking"]
    },
    details: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["paid", "failed", "refunded"],
        default: "paid"
    },
    transactionId: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
