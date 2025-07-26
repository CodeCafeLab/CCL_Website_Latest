const express = require("express");
const router = express.Router();
// Removed authMiddleware import - no longer needed
const authController = require("../controllers/authController");

// Profile route without authentication middleware
router.get("/profile", authController.getProfile);

module.exports = router;