const jwt = require("jsonwebtoken");

module.exports = function checkToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(403).json({ msg: "Access denied!" });
    }

    try {
        const secret = process.env.SECRET;

        jwt.verify(token, secret);

        next();
    } catch (error) {
        res.status(400).json({ msg: "Invalid token!" });
        console.error(error);
    }
};
