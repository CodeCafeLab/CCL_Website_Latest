const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.get("/slug/:slug", blogController.getBlogBySlug);

// Protected routes (require authentication)
router.post("/", authMiddleware, blogController.createBlog);
router.put("/:id", authMiddleware, blogController.updateBlog);
router.delete("/:id", authMiddleware, blogController.deleteBlog);

module.exports = router;
