const jwt = require("jsonwebtoken");
const Users = require("../models/User");

const fetchuser = async (req, res, next) => {
  const token = req.cookies.authToken; // Get token from cookies
  console.log("Cookies:", req.cookies); // Log cookies for verification

  if (!token) {
    return res.status(401).send({ error: "Authentication token missing" });
  }

  try {
    const data = jwt.verify(token, "secret_ecom");
    console.log("Decoded token data:", data);

    if (!data || !data.userID) {
      console.log("Token missing userID:", data);
      return res.status(401).send({ error: "Invalid or malformed token" });
    }

    const user = await Users.findById(data.userID);
    if (!user) {
      console.log("User not found for userID:", data.userID);
      return res.status(404).send({ error: "User not found" });
    }

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    console.error("JWT verification error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).send({ error: "Token has expired" });
    }
    return res.status(401).send({ error: "Invalid authentication token" });
  }
};

// Middleware to check admin access
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ error: "Admin access required" });
  }
  next(); // Proceed to the next middleware or route handler
};

module.exports = { fetchuser, authorizeAdmin };
