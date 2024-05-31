const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: [orderItemSchema],
        totalAmount: { type: Number, required: true },
        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            country: { type: String, required: true },
            zipCode: { type: String, required: true },
        },
        paymentMethod: { type: String, required: true },
        paymentResult: { type: Object },
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
