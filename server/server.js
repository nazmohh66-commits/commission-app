// ======================
// 1. IMPORTS
// ======================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ======================
// 2. APP INIT
// ======================
const app = express();

// ======================
// 3. MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// 4. HEALTH CHECK ROUTE
// ======================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running 🚀"
  });
});

// ======================
// 5. PORT CONFIG
// ======================
const PORT = process.env.PORT || 5000;

// ======================
// 6. START SERVER FIRST (RENDER SAFE)
// ======================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ======================
// 7. DATABASE CONNECTION (NON-BLOCKING)
// ======================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.log("MongoDB Error ❌:", err.message);
  });

// ======================
// 8. FUTURE ROUTES (UNCOMMENT LATER)
// ======================
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/admin", require("./routes/admin"));
// app.use("/api/commission", require("./routes/commission"));
// app.use("/api/activity", require("./routes/activity"));