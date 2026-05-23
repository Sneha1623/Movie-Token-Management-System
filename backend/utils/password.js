const crypto = require("crypto");

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
    return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
    if (!storedHash || !storedHash.includes(":")) {
        return false;
    }

    const [salt, originalHash] = storedHash.split(":");
    const incomingHash = hashPassword(password, salt).split(":")[1];
    const originalBuffer = Buffer.from(originalHash);
    const incomingBuffer = Buffer.from(incomingHash);

    if (originalBuffer.length !== incomingBuffer.length) {
        return false;
    }

    return crypto.timingSafeEqual(originalBuffer, incomingBuffer);
}

function createSessionToken() {
    return crypto.randomBytes(32).toString("hex");
}

module.exports = {
    createSessionToken,
    hashPassword,
    verifyPassword
};
