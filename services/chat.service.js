const Chat = require("../models/chat.model");

exports.sendMessage = async (senderId, recipientId, message) => {
    const newMessage = new Chat({
        sender: senderId,
        recipient: recipientId,
        message,
    });
    await newMessage.save();

    return newMessage;
};

exports.getChatHistory = async (senderId, recipientId) => {
    const chatHistory = await Chat.find({
        $or: [
            { sender: senderId, recipient: recipientId },
            { sender: recipientId, recipient: senderId },
        ],
    }).populate("sender recipient");

    return chatHistory;
};
