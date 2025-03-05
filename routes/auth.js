const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Sign up route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user_username = await User.findOne({ username });
    if (user_username) {
      let error = new Error("Existing username, pick another username");
      error.status = 409;
      throw error;
    }
    const user_email = await User.findOne({ email });
    if (user_email) {
      let error = new Error("Existing email, pick another email");
      error.status = 409;
      throw error;
    }
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        let error = new Error("Error hashing password:", err);
        error.status = 500;
        throw error;
      }
      const newUser = new User({ username, email, password: hash });
      await newUser.save();
      req.session.user = newUser;

      const user_length = await User.countDocuments();
      if (!user_length) {
        let error = new Error("Error signing up");
        error.status = 500;
        throw error;
      }
      req.session.totalUserLength = user_length;
      res.status(200).send({ message: "Sign up successful" });
    });
  } catch (error) {
    console.log("error", error.status);
    console.log("error", error.message);
    res.status(error.status || 500).json({ message: error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user_length = await User.countDocuments();
    if (!user_length) {
      const error = new Error("No users found");
      error.status = 404;
      throw error;
    }

    const user = await User.findOne({ username });
    if (!user) {
      const error = new Error("Invalid username");
      error.status = 401;
      throw error;
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      const error = new Error("Invalid password");
      error.status = 401;
      throw error;
    }

    req.session.user = user;
    req.session.totalUserLength = user_length;
    res.status(200).send({ message: "Login successful" });
  } catch (error) {
    console.log("error caught", error);
    res.status(error.status || 500).json({ message: error.message });
  }
});

module.exports = router;
