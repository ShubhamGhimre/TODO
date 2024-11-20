const { default: mongoose } = require("mongoose");

const Post = mongoose.model("Post", {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    posted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  });

  module.exports = Post;