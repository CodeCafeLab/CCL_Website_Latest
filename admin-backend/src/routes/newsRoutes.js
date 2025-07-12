const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/published', newsController.getPublished);
router.get('/featured', newsController.getFeatured);
router.get('/slug/:slug', newsController.getBySlug);

// Protected routes (require authentication)
router.get('/', authMiddleware, newsController.getAll);
router.get('/:id', authMiddleware, newsController.getById);
router.post('/', authMiddleware, newsController.create);
router.put('/:id', authMiddleware, newsController.update);
router.delete('/:id', authMiddleware, newsController.delete);

module.exports = router; 