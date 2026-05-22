// ======================================================
// SECTION 1 — IMPORTS
// ======================================================
const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const Commission = require("../models/Commission");


// ======================================================
// SECTION 2 — DASHBOARD STATS API
// ======================================================
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {

    const users = await User.find();
    const commissions = await Commission.find();

    const revenue = commissions.reduce(
      (sum, item) => sum + (item.final || 0),
      0
    );

    res.json({
      users: users.length,
      commissions: commissions.length,
      revenue
    });

  } catch (err) {
    res.status(500).json({
      msg: "Server error",
      error: err.message
    });
  }
});


// ======================================================
// SECTION 3 — GET ALL USERS (ADMIN PANEL)
// ======================================================
router.get("/users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({
      msg: "Error fetching users"
    });
  }
});


// ======================================================
// SECTION 4 — DELETE USER (ADMIN CONTROL)
// ======================================================
router.delete("/user/:id", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted" });
  } catch (err) {
    res.status(500).json({
      msg: "Error deleting user"
    });
  }
});


// ======================================================
// SECTION 5 — EXPORT
// ======================================================
module.exports = router;