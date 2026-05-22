// ======================================================
// SECTION 1 — IMPORTS
// ======================================================
const jwt = require("jsonwebtoken");


// ======================================================
// SECTION 2 — AUTH MIDDLEWARE
// ======================================================
const authMiddleware = (req, res, next) => {

  try {

    // get token from headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        msg: "No token, access denied"
      });
    }

    // remove "Bearer " if exists
    const cleanToken = token.replace("Bearer ", "");

    // verify token
    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);

    // attach user data to request
    req.user = decoded;

    next();

  } catch (err) {

    return res.status(401).json({
      msg: "Invalid token"
    });

  }

};


// ======================================================
// SECTION 3 — EXPORT
// ======================================================
module.exports = authMiddleware;