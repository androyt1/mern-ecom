const express = require("express");
const chatController = require("../controllers/chat.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/send-message", authMiddleware.isAuthenticated, chatController.sendMessage);
router.get("/history/:recipientId", authMiddleware.isAuthenticated, chatController.getChatHistory);

module.exports = router;
