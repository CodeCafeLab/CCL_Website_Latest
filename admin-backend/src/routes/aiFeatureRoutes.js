const express = require("express");
const router = express.Router();
const aiFeatureController = require("../controllers/aiFeatureController");

// POST /api/ai
router.post("/", aiFeatureController.createAiFeature);

// GET /api/ai
router.get("/", aiFeatureController.getAllAiFeatures);

// GET /api/ai/:id
router.get("/:id", aiFeatureController.getAiFeatureById);

// PUT /api/ai/:id
router.put("/:id", aiFeatureController.updateAiFeature);

// DELETE /api/ai/:id
router.delete("/:id", aiFeatureController.deleteAiFeature);

// PATCH /api/ai/:id/view - increment view count
// router.patch("/:id/view", aiFeatureController.incrementViewCount);

module.exports = router;
