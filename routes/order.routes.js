const express = require("express");
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware.isAuthenticated, orderController.createOrder);
router.get("/:id", authMiddleware.isAuthenticated, orderController.getOrderById);
router.get("/", authMiddleware.isAuthenticated, orderController.getOrdersByUser);
router.put(
    "/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdmin,
    orderController.updateOrderStatus
);

module.exports = router;
