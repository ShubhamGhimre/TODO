const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Users = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
  const checkUser = await Users.findOne({ email: req.body.email });

  if (checkUser) {
    return res.status(400).json({
      success: false,
      message: "Email already exists",
    });
  }
    const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();

    const data = {
      user: {
        id: user.id,
      },
    };

    const authToken = jwt.sign(data, "secret_ecom", { expiresIn: "1h" });
    res.json({
      success: true,
      message: "User registered successfully",
      authToken: authToken,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });

  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, "secret_ecom", { expiresIn: "1h" });
      res.cookie("authToken", authToken,{
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, //  1 hour
      })
      res.json({
        success: true,
        message: "User logged in successfully",
        authToken: authToken,
        role: user.role,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }
});

module.exports = router;
