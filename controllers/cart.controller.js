const cartService = require("../services/cart.service");

exports.addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.userId;
        const cart = await cartService.addToCart(userId, productId, quantity);
        res.status(200).json({ message: "Product added to cart", cart });
    } catch (err) {
        next(err);
    }
};

exports.getCart = async (req, res, next) => {
    try {
        const userId = req.userId;
        const cart = await cartService.getCart(userId);
        res.status(200).json({ cart });
    } catch (err) {
        next(err);
    }
};

exports.updateCartItem = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.userId;
        const cart = await cartService.updateCartItem(userId, productId, quantity);
        res.status(200).json({ message: "Cart updated", cart });
    } catch (err) {
        next(err);
    }
};

exports.clearCart = async (req, res, next) => {
    try {
        const userId = req.userId;
        const cart = await cartService.clearCart(userId);
        res.status(200).json({ message: "Cart cleared", cart });
    } catch (err) {
        next(err);
    }
};
