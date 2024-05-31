const express = require("express");
const productController = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
    "/",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdmin,
    productController.createProduct
);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.put(
    "/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdmin,
    productController.updateProduct
);
router.delete(
    "/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdmin,
    productController.deleteProduct
);

module.exports = router;
