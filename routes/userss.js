const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 1️⃣ LOGIN - POST /api/login
router.post("/login", async (req, res) => {
  const { mail, pswd } = req.body;

  if (!mail || !pswd) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ mail });

    if (!user || user.pswd !== pswd) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// 5️⃣ PROFILE by emp_id - GET /api/profile-by-empid/:emp_id
router.get("/profile/:emp_id", async (req, res) => {
  try {
    const user = await User.findOne({ emp_id: req.params.emp_id }).select("-pswd");

    if (!user) {
      return res.status(404).json({ error: "User not found with the given emp_id" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// 3️⃣ UPDATE PASSWORD - PATCH /api/update-password
router.patch("/update-password", async (req, res) => {
  const { mail, newPassword } = req.body;

  if (!mail || !newPassword) {
    return res.status(400).json({ error: "Email and new password are required" });
  }

  try {
    const user = await User.findOne({ mail });

    if (!user) return res.status(404).json({ error: "Email not found" });

    user.pswd = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// 4️⃣ REGISTER - POST /api/register
router.post("/register", async (req, res) => {
  const { emp_id, username, mail, pswd, phn_num, role, dept } = req.body;

  if (!emp_id || !username || !mail || !pswd || !phn_num || !role) {
    return res.status(400).json({ error: "All required fields must be provided" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ emp_id }, { mail }] });
    if (existingUser) {
      return res.status(409).json({ error: "User with emp_id or mail already exists" });
    }

    const newUser = new User({
      emp_id,
      username,
      mail,
      pswd,
      phn_num,
      role,
      dept
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
