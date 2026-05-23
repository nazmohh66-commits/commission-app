// ======================
// IMPORTS
// ======================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ======================
// APP
// ======================
const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// TEST ROUTE
// ======================
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

// ======================
// ROUTES (ADD YOUR ROUTES HERE LATER)
// ======================
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/admin", require("./routes/admin"));
// app.use("/api/commission", require("./routes/commission"));
// app.use("/api/activity", require("./routes/activity"));

// ======================
// PORT
// ======================
const PORT = process.env.PORT || 5000;

// ======================
// START SERVER FIRST (IMPORTANT FIX)
// ======================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ======================
// DATABASE CONNECTION (NON-BLOCKING)
// ======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));