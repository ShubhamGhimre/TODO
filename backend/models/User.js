const { default: mongoose } = require("mongoose");

const Users = mongoose.model("Users", {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      default: "user",
    },
    tenantID: {
      type: String,
      required: true,
    }
  });
  
  module.exports = Users;