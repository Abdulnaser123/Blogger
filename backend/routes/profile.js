/** @format */

// routes/profile.js
const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../Middleware/auth"); // Import middleware to ensure user is authenticated
const User = require("../models/User");

// Get or update user profile
router
  .route("/")
  .all(ensureAuthenticated) // Middleware to ensure user is authenticated for all methods
  .get(async (req, res) => {
    // The authenticated user's information is available in req.user
    const userProfile = {
      id: req.user._id,
      email: req.user.email,
      // Add other user profile fields as needed
    };

    res.status(200).json({ user: userProfile });
  })
  .put(async (req, res) => {
    const { email /* Add other fields to update */ } = req.body;

    try {
      // Find the user by ID
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Update user fields
      user.email = email;
      // Update other fields as needed

      // Save the updated user
      await user.save();

      // Return the updated user profile
      res.status(200).json({ user: user.toObject() });
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Error updating user profile." });
    }
  });

module.exports = router;
