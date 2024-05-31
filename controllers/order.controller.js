const orderService = require("../services/order.service");

exports.createOrder = async (req, res, next) => {
    try {
        const userId = req.userId;
        const orderData = req.body;
        const order = await orderService.createOrder(userId, orderData);
        res.status(201).json({ message: "Order created successfully", order });
    } catch (err) {
        next(err);
    }
};

exports.getOrderById = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const order = await orderService.getOrderById(orderId);
        res.status(200).json({ order });
    } catch (err) {
        next(err);
    }
};

exports.getOrdersByUser = async (req, res, next) => {
    try {
        const userId = req.userId;
        const orders = await orderService.getOrdersByUser(userId);
        res.status(200).json({ orders });
    } catch (err) {
        next(err);
    }
};

exports.updateOrderStatus = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        const updatedOrder = await orderService.updateOrderStatus(orderId, status);
        res.status(200).json({ message: "Order status updated", order: updatedOrder });
    } catch (err) {
        next(err);
    }
};
