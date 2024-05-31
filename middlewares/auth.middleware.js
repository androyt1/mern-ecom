const jwt = require("../utils/jwt");

exports.isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verifyToken(token);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

exports.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    } catch (err) {
        next(err);
    }
};
