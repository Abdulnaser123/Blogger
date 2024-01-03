/** @format */

// routes/posts.js
const express = require("express");
const router = express.Router();
const Post = require("../models/User");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await Post.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific post
router.get("/:id", getPost, (req, res) => {
  res.json(res.user);
});

// Middleware to get a specific post by ID
async function getPost(req, res, next) {
  let user;

  try {
    user = await Post.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.user = user;
  next();
}

module.exports = router;
