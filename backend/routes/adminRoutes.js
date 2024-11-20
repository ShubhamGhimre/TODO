const express = require("express");
const router = express.Router();
const { fetchuser, authorizeAdmin } = require("../middleware/authMiddleware");
const Users = require("../models/User");

router.get("/get-users", fetchuser, authorizeAdmin, async (req, res) => {
  try {
    const users = await Users.find();
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
});


// Get all users (Admin-only)
router.get("/users", fetchuser, authorizeAdmin, async (req, res) => {
  try {
    const users = await Users.find();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
});

// Delete user (Admin-only)
router.post("/delete-user", fetchuser, authorizeAdmin, async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
});



module.exports = router;
