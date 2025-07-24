const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const existing = await userModel.findByEmail(email);
    if (existing) {
      return res.status(409).json({ message: "Email already registered." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { email, password: hashedPassword, name };
    const userId = await userModel.create(user);
    res.status(201).json({ id: userId, email, name });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    res.json({ id: 1, name: "Demo User", email: "demo@example.com" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
