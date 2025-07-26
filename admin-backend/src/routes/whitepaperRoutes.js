const express = require('express');
const router = express.Router();
const whitepaperController = require('../controllers/whitepaperController');

// Public routes
router.get('/published', whitepaperController.getPublished);
router.get('/featured', whitepaperController.getFeatured);
router.get('/slug/:slug', whitepaperController.getBySlug);
router.post('/:id/download', whitepaperController.download);

// Routes without authentication middleware
router.get('/', whitepaperController.getAll);
router.get('/:id', whitepaperController.getById);
router.post('/', whitepaperController.create);
router.put('/:id', whitepaperController.update);
router.delete('/:id', whitepaperController.delete);

module.exports = router; 