const Order = require("../models/order.model");
const Cart = require("../models/cart.model");

exports.createOrder = async (userId, orderData) => {
    const { items, totalAmount, shippingAddress, paymentMethod, paymentResult } = orderData;

    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
    }

    const order = new Order({
        user: userId,
        items: cart.items,
        totalAmount,
        shippingAddress,
        paymentMethod,
        paymentResult,
    });

    await order.save();
    await Cart.findOneAndUpdate({ user: userId }, { items: [] });

    return order;
};

exports.getOrderById = async (orderId) => {
    const order = await Order.findById(orderId).populate("items.product");
    return order;
};

exports.getOrdersByUser = async (userId) => {
    const orders = await Order.find({ user: userId }).populate("items.product");
    return orders;
};

exports.updateOrderStatus = async (orderId, status) => {
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    return order;
};
