const Cart = require("../models/cart.model");

exports.addToCart = async (userId, productId, quantity) => {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.product.toString() === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    return cart;
};

exports.getCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    return cart;
};

exports.updateCartItem = async (userId, productId, quantity) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new Error("Cart not found");
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (itemIndex === -1) {
        throw new Error("Item not found in cart");
    }

    if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
    } else {
        cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    return cart;
};

exports.clearCart = async (userId) => {
    const cart = await Cart.findOneAndUpdate({ user: userId }, { items: [] }, { new: true });
    return cart;
};
