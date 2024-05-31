const Order = require("../models/order.model");
const User = require("../models/user.model");

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate("user", "name email");
        res.status(200).json({ orders });
    } catch (err) {
        next(err);
    }
};

exports.updateOrderStatus = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        res.status(200).json({ message: "Order status updated", order: updatedOrder });
    } catch (err) {
        next(err);
    }
};

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, "-password");
        res.status(200).json({ users });
    } catch (err) {
        next(err);
    }
};

exports.updateUserRole = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { isAdmin } = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, { isAdmin }, { new: true });
        res.status(200).json({ message: "User role updated", user: updatedUser });
    } catch (err) {
        next(err);
    }
};
