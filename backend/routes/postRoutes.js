const express = require("express");
const router = express.Router();
const Post = require("../models/Posts");
const { fetchuser, authorizeAdmin } = require("../middleware/authMiddleware");

router.post("/create", fetchuser, async (req, res) => {
    console.log("Request body: ", req.body);
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Please authenticate using a valid token",
        });
      }
      const post = new Post({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed || false,
        posted_by: req.user._id, // user id from middleware
        tenantID: req.user.tenantID,
      });
      await post.save();
      console.log("Data saved successfully");
  
      res.json({
        success: true,
        message: "Data saved successfully",
      });
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ success: false, message: "Failed to save data" });
    }
  });

  router.get("/read", fetchuser, async (req, res) => {
    try {
      const posts = await Post.find({ posted_by: req.user._id }).populate(
        "posted_by",
        "name email "
      );
      res.json({
        success: true,
        data: posts,
      });
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ success: false, message: "Failed to read data" });
    }
  });

  router.get("/read/:id", fetchuser, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post)
        return res
          .status(404)
          .json({ success: false, message: "Post not found" });
      res.json(post);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch post" });
    }
  });
  
  router.put("/update/:id", fetchuser, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res
          .status(404)
          .json({ success: false, message: "Post not found" });
      }
  
      if (post.posted_by.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({
            success: false,
            message: "You are not authorized to update this post",
          });
      }
  
      const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updatedPost)
        return res
          .status(404)
          .json({ success: false, message: "Post not found" });
      res.json({
        success: true,
        message: "Post updated successfully",
        data: updatedPost,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to update post" });
    }
  });
  
  router.post("/delete", fetchuser, async (req, res) => {
    try {
      const post = await Post.findById(req.body.id);
      if (!post) {
        return res
          .status(404)
          .json({ success: false, message: "Post not found" });
      }
      if (post.posted_by.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({
            success: false,
            message: "You are not authorized to delete this post",
          });
      }
  
      await Post.deleteOne({ _id: req.body.id });
      res.json({ success: true, message: "Data deleted successfully" });
    } catch (error) {
      console.log("Error: ", error);
      res.status(500).json({ success: false, message: "Failed to delete data" });
    }
  });
  
  router.post("/mark-completed", fetchuser, async (req, res) => {
    try {
      await Post.updateOne({ _id: req.body.id }, { completed: true });
      res.json({ success: true, message: "Post marked as completed" });
    } catch (error) {
      console.log("Error: ", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to mark post as completed" });
    }
  });
  
  module.exports = router;