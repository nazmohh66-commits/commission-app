const jwt = require("jsonwebtoken");

// ===============================
// AUTH MIDDLEWARE (PROTECT ROUTES)
// ===============================
module.exports = function (req, res, next) {
  try {
    // token comes from frontend header
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        msg: "No token, access denied"
      });
    }

    // verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // attach user data to request
    req.user = verified;

    next();

  } catch (err) {
    res.status(401).json({
      msg: "Invalid token"
    });
  }
};