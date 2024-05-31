const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.model("Chat", chatMessageSchema);

module.exports = Chat;
