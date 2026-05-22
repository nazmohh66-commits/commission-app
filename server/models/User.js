const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
    role: {
  type: String,
  default: "user"   // or "admin"
}
});

module.exports = mongoose.model("User", UserSchema);