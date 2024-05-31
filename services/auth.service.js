const User = require("../models/user.model");
const jwt = require("../utils/jwt");

exports.register = async (userData) => {
    const { name, email, password } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    return newUser;
};

exports.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.generateToken(user._id);

    return { user, token };
};
