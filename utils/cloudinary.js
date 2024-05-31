const cloudinary = require("cloudinary").v2;
const config = require("../config");

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret,
});

exports.uploadImage = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder: "ecommerce/products",
            resource_type: "auto",
        });
        return result.secure_url;
    } catch (err) {
        console.error("Error uploading image to Cloudinary:", err);
        throw err;
    }
};

exports.deleteImage = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (err) {
        console.error("Error deleting image from Cloudinary:", err);
        throw err;
    }
};
