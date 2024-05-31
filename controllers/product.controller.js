const productService = require("../services/product.service");

exports.createProduct = async (req, res, next) => {
    try {
        const productData = req.body;
        const newProduct = await productService.createProduct(productData);
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (err) {
        next(err);
    }
};

exports.getProducts = async (req, res, next) => {
    try {
        const query = req.query;
        const products = await productService.getProducts(query);
        res.status(200).json({ products });
    } catch (err) {
        next(err);
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await productService.getProductById(productId);
        res.status(200).json({ product });
    } catch (err) {
        next(err);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const productData = req.body;
        const updatedProduct = await productService.updateProduct(productId, productData);
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (err) {
        next(err);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await productService.deleteProduct(productId);
        res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
    } catch (err) {
        next(err);
    }
};
