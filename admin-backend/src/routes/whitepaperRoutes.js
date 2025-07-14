const express = require('express');
const router = express.Router();
const whitepaperController = require('../controllers/whitepaperController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/published', whitepaperController.getPublished);
router.get('/featured', whitepaperController.getFeatured);
router.get('/slug/:slug', whitepaperController.getBySlug);
router.post('/:id/download', whitepaperController.download);

// Protected routes (require authentication)
router.get('/', authMiddleware, whitepaperController.getAll);
router.get('/:id', authMiddleware, whitepaperController.getById);
router.post('/', authMiddleware, whitepaperController.create);
router.put('/:id', authMiddleware, whitepaperController.update);
router.delete('/:id', authMiddleware, whitepaperController.delete);

module.exports = router; 