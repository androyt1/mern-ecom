module.exports = {
    db: {
        uri: process.env.MONGODB_URI,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: "1d",
    },
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    },
    stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY,
    },
};
