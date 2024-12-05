const port = 4000;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const adminRoutes = require("./routes/adminRoutes");

const { fetchuser, authorizeAdmin } = require("./middleware/authMiddleware");
const Users = require("./models/User");

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

async function connectToDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Todo");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

connectToDB();

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express app is running");
});

app.get("/get-user", fetchuser, authorizeAdmin, async (req, res) => {
  res.send(req.user);
});


app.get("/get-role", fetchuser, (req, res) => {
  console.log("User in /get-role:", req.user);
  res.status(200).send({ role: req.user.role });
});

app.use("/auth", authRoutes); // Base route for auth
app.use("/posts", postRoutes); // Base route for posts
app.use("/admin", adminRoutes); // Base route for users

app.post("/logout", (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  // res.clearCookie("tenantId", {
  //   httpOnly: false,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "strict",
  // });
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server is running on port: ", port);
  } else {
    console.log("Error: ", error);
  }
});
