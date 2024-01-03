/** @format */

const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const newUser = new User({ email, password: password });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user." });
  }
});

// Login
router.post("/login", passport.authenticate("local"), (req, res) => {
  const token = jwt.sign({ userId: req.user._id }, "mySecretKey123", {
    expiresIn: "1h", // Set the expiration time as needed
  });

  res
    .status(200)
    .json({ message: "Login successful.", user: req.user, token: token });
});

// Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error during logout." });
    }
    res.status(200).json({ message: "Logout successful." });
  });
});

module.exports = router;
