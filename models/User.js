const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  emp_id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  mail: { type: String, required: true, unique: true },
  pswd: { type: String, required: true },
  phn_num: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "vp", "manager", "employee"],
    required: true
  },
  dept: { type: String }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
