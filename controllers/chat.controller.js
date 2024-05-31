const chatService = require("../services/chat.service");

exports.sendMessage = async (req, res, next) => {
    try {
        const senderId = req.userId;
        const { recipientId, message } = req.body;
        const newMessage = await chatService.sendMessage(senderId, recipientId, message);
        res.status(201).json({ message: "Message sent", newMessage });
    } catch (err) {
        next(err);
    }
};

exports.getChatHistory = async (req, res, next) => {
    try {
        const senderId = req.userId;
        const recipientId = req.params.recipientId;
        const chatHistory = await chatService.getChatHistory(senderId, recipientId);
        res.status(200).json({ chatHistory });
    } catch (err) {
        next(err);
    }
};
