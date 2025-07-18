const express = require("express");
const router = express.Router();
const { runAIDemo } = require("../controllers/aiDemoController");

router.post("/", runAIDemo);

module.exports = router;
