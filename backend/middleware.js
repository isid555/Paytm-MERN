const { JWT_SECRET } = require("../backend/config");
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next)  {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({
            message: "Invalid Authorization Header"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({
            message: "Invalid Token",
            error: err
        });
    }
};

