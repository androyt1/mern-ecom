const express = require("express");
const adminController = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get(
    "/orders",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdmin,
    adminController.getOrders
);
router.put(
    "/orders/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdmin,
    adminController.updateOrderStatus
);
router.get(
    "/users",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdmin,
    adminController.getUsers
);
router.put(
    "/users/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdmin,
    adminController.updateUserRole
);

module.exports = router;
