const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Users = require("../models/User");
const { v4: uuidv4 } = require("uuid");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const checkUser = await Users.findOne({ email: req.body.email });
    const tenantID = uuidv4();

    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    const user = new Users({
      name,
      email,
      password,
      tenantID,
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
  try{
    const { email, password } = req.body;
    let user = await Users.findOne({ email });
  
    if (user) {
      const passCompare = password === user.password;
      if (passCompare) {
        const data = {
          user: {
            id: user.id,
            tenantID: user.tenantID,
          },
        };
        const authToken = jwt.sign(
          { userID: user.id, tenantID: user.tenantID },
          "secret_ecom",
          { expiresIn: "1h" }
        );
        // const authToken = jwt.sign(data, "secret_ecom", { expiresIn: "1h" });
        console.log(authToken);
  
        res.cookie("authToken", authToken, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 60 * 60 * 1000, //  1 hour
        });

        res.cookie('tenantID', user.tenantID, {
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
          maxAge: 60 * 60 * 1000, //  1 hour
        })

        res.status(200).json({
          success: true,
          message: "User logged in successfully",
          authToken: authToken,
          role: user.role,
          tenantID: user.tenantID,
        });
        res.json({
          success: true,
          message: "User logged in successfully",
          authToken: authToken,
          role: user.role,
          tenantID: user.tenantID,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  }catch(error){
    console.log(error);
  }
});

module.exports = router;
