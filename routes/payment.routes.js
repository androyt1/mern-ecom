const express = require("express");
const paymentController = require("../controllers/payment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
    "/create-payment-intent",
    authMiddleware.isAuthenticated,
    paymentController.createPaymentIntent
);
router.post("/confirm-payment", authMiddleware.isAuthenticated, paymentController.confirmPayment);
router.post("/webhook", paymentController.handleWebhook);

module.exports = router;
