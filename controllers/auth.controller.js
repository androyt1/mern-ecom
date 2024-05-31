const authService = require("../services/auth.service");

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await authService.register({ name, email, password });
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.login(email, password);
        res.status(200).json({ message: "Login successful", user, token });
    } catch (err) {
        next(err);
    }
};
