require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token =
    req.session?.token || req.headers["authorization"]?.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  jwt.verify(token, process.env.SOLUTINO_AUTH_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token." });

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
