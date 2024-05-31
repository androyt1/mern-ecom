const User = require("../models/user.model");

exports.getUserProfile = async (userId) => {
    const user = await User.findById(userId).select("-password");
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

exports.updateUserProfile = async (userId, updateData) => {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select(
        "-password"
    );
    if (!updatedUser) {
        throw new Error("User not found");
    }
    return updatedUser;
};

exports.changePassword = async (userId, currentPassword, newPassword) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordValid = await user.matchPassword(currentPassword);
    if (!isPasswordValid) {
        throw new Error("Invalid current password");
    }

    user.password = newPassword;
    await user.save();
    return user;
};

exports.getAllUsers = async () => {
    const users = await User.find().select("-password");
    return users;
};
