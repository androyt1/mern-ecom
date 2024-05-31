const config = require("../config");

const stripe = require("stripe")(config.stripe.secretKey);

exports.createPaymentIntent = async (amount, currency, metadata) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        metadata,
    });

    return paymentIntent;
};

exports.confirmPayment = async (paymentIntentId) => {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);
    return paymentIntent;
};

exports.handleWebhook = async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, config.stripe.webhookSecret);
    } catch (err) {
        console.error(err);
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case "payment_intent.succeeded":
            const paymentIntent = event.data.object;
            console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
            // Handle successful payment
            break;
        case "payment_method.attached":
            const paymentMethod = event.data.object;
            console.log(`PaymentMethod ${paymentMethod.id} was attached to customer!`);
            // Handle payment method attachment
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    response.status(200).end();
};
