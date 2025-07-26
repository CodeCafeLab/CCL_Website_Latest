const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

// All routes are now public (no authentication required)
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.get("/slug/:slug", blogController.getBlogBySlug);
router.post("/", blogController.createBlog);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
