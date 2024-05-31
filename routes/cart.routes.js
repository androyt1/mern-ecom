const express = require("express");
const cartController = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware.isAuthenticated, cartController.addToCart);
router.get("/", authMiddleware.isAuthenticated, cartController.getCart);
router.put("/", authMiddleware.isAuthenticated, cartController.updateCartItem);
router.delete("/", authMiddleware.isAuthenticated, cartController.clearCart);

module.exports = router;
