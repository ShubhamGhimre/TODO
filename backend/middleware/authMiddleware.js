const jwt = require("jsonwebtoken");
const Users = require("../models/User");

const fetchuser = async (req, res, next) => {
  const token = req.cookies.authToken; // Get token from cookies
  const tenantId = req.cookies.tenantID; // Get tenantId from cookies

  console.log("Cookies:", req.cookies); // Log cookies for verification

  if (!token || !tenantId) {
    return res.status(401).send({ error: "Authentication token or tenantId missing" });
  }

  try {
    // Verify the token using the secret key
    const data = jwt.verify(token, "secret_ecom");

    console.log("Decoded token data:", data);  // Log decoded token data

    // Check if the data structure matches the expected format
    if (!data || !data.userID) {
      return res.status(401).send({ error: "Invalid token data" });
    }

    // Find the user from the database using the userID from the token
    const user = await Users.findById({_id: data.userID, tenantID: tenantId});

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Check if the tenantId in the token matches the tenantId in the database
    if (user.tenantID !== tenantId) {
      return res.status(403).send({ error: "Invalid tenantId" });
    }

    req.user = user; // Attach user to the request object
    req.tenantId = tenantId; // Attach tenantId to the request object for further use
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log("JWT verification error:", error); // Log the error for debugging
    return res.status(401).send({ error: "Invalid authentication token" });
  }
};


const fetchUserByTenant = async (tenantId) => {
  const users = await Users.find({ tenantID: tenantId });
  return users;
}


// Middleware to check admin access
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ error: "Admin access required" });
  }
  next(); // Proceed to the next middleware or route handler
};

module.exports = { fetchuser, authorizeAdmin };
