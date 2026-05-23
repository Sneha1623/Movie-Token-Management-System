const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    password: {
        type: String,
        select: false
    },
    sessionToken: {
        type: String,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
