// ===============================
// ENV CONFIG
// ===============================
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


// ===============================
// MIDDLEWARE
// ===============================
app.use(cors({
  origin: "*"
}));

app.use(express.json());


// ===============================
// ROUTES
// ===============================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/commission", require("./routes/commission"));
app.use("/api/activity", require("./routes/activity"));
app.use("/api/admin", require("./routes/admin"));


// ===============================
// TEST ROUTE
// ===============================
app.get("/", (req, res) => {
  res.send("Server is running");
});


// ===============================
// MONGODB CONNECTION
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));


// ===============================
// START SERVER (FIXED FOR DEPLOYMENT)
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});