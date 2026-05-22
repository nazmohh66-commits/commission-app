// ======================================================
// SECTION 1 — IMPORTS
// ======================================================
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// ======================================================
// SECTION 2 — REGISTER USER API
// ======================================================
router.post("/register", async (req, res) => {

  try {

    const { username, password } = req.body;

    // check if user already exists
    const exists = await User.findOne({ username });

    if (exists) {
      return res.status(400).json({
        msg: "User already exists"
      });
    }

    // hash password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user (default role = user)
    const user = await User.create({
      username,
      password: hashedPassword,
      role: "user"
    });

    res.json({
      msg: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });

  } catch (err) {

    console.log("REGISTER ERROR:", err);

    res.status(500).json({
      msg: "Server error during registration"
    });

  }

});


// ======================================================
// SECTION 3 — LOGIN USER API
// ======================================================
router.post("/login", async (req, res) => {

  try {

    const { username, password } = req.body;

    // find user in DB
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        msg: "Invalid credentials"
      });
    }

    // check password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        msg: "Invalid credentials"
      });
    }

    // create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    // send response
    res.json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });

  } catch (err) {

    console.log("LOGIN ERROR:", err);

    res.status(500).json({
      msg: "Server error during login"
    });

  }

});


// ======================================================
// SECTION 4 — EXPORT ROUTER
// ======================================================
module.exports = router;