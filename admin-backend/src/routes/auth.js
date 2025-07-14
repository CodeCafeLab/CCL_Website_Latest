const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

router.get("/profile", authMiddleware, authController.getProfile);

module.exports = router;