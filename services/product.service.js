const Product = require("../models/product.model");
const cloudinary = require("../utils/cloudinary");

exports.createProduct = async (productData) => {
    const { name, description, price, category, stock } = productData;

    // Upload images to Cloudinary
    const images = await Promise.all(
        productData.images.map(async (image) => {
            const result = await cloudinary.uploader.upload(image, {
                folder: "ecommerce/products",
            });
            return result.secure_url;
        })
    );

    // Create a new product
    const newProduct = new Product({
        name,
        description,
        price,
        images,
        category,
        stock,
    });
    await newProduct.save();

    return newProduct;
};

exports.getProducts = async (query) => {
    const products = await Product.find(query);
    return products;
};

exports.getProductById = async (productId) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
};

exports.updateProduct = async (productId, productData) => {
    const { name, description, price, category, stock, images } = productData;

    // Upload new images to Cloudinary
    const updatedImages = await Promise.all(
        images.map(async (image) => {
            const result = await cloudinary.uploader.upload(image, {
                folder: "ecommerce/products",
            });
            return result.secure_url;
        })
    );

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
            name,
            description,
            price,
            images: updatedImages,
            category,
            stock,
        },
        { new: true }
    );

    if (!updatedProduct) {
        throw new Error("Product not found");
    }

    return updatedProduct;
};

exports.deleteProduct = async (productId) => {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
        throw new Error("Product not found");
    }
    return deletedProduct;
};
