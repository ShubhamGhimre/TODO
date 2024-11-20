const jwt = require("jsonwebtoken");
const Users = require("../models/User");

// Middleware to check authentication
const fetchuser = async (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).send({ error: "Authentication token missing" });
  }

  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = await Users.findById(data.user.id);
    if (!req.user) {
      return res.status(404).send({ error: "User not found" });
    }
    next();
  } catch (error) {
    res.status(401).send({ error: "Invalid authentication token" });
  }
};

// Middleware to check admin access
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ error: "Admin access required" });
  }
  next();
};

module.exports = { fetchuser, authorizeAdmin };
