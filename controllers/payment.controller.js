const stripeUtils = require("../utils/stripe");

exports.createPaymentIntent = async (req, res, next) => {
    try {
        const { amount, currency, metadata } = req.body;
        const paymentIntent = await stripeUtils.createPaymentIntent(amount, currency, metadata);
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        next(err);
    }
};

exports.confirmPayment = async (req, res, next) => {
    try {
        const { paymentIntentId } = req.body;
        const paymentIntent = await stripeUtils.confirmPayment(paymentIntentId);
        res.status(200).json({ paymentIntent });
    } catch (err) {
        next(err);
    }
};

exports.handleWebhook = async (req, res, next) => {
    try {
        await stripeUtils.handleWebhook(req, res);
    } catch (err) {
        next(err);
    }
};
