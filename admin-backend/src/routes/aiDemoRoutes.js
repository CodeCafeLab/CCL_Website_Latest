const express = require("express");
const router = express.Router();
const { runAIDemo, getAIDemoInfo } = require("../controllers/aiDemoController");

router.get("/", getAIDemoInfo);
router.post("/", runAIDemo);

module.exports = router;
