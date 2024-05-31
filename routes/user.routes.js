const express = require("express");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/profile", authMiddleware.isAuthenticated, userController.getUserProfile);

router.put("/profile", authMiddleware.isAuthenticated, userController.updateUserProfile);

router.put("/password", authMiddleware.isAuthenticated, userController.changePassword);

router.get("/", authMiddleware.isAuthenticated, authMiddleware.isAdmin, userController.getAllUsers);

module.exports = router;
