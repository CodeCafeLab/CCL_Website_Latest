const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/published', reportController.getPublished);
router.get('/featured', reportController.getFeatured);
router.get('/slug/:slug', reportController.getBySlug);
router.post('/:id/download', reportController.download);

// Protected routes (require authentication)
router.get('/', authMiddleware, reportController.getAll);
router.get('/:id', authMiddleware, reportController.getById);
router.post('/', authMiddleware, reportController.create);
router.put('/:id', authMiddleware, reportController.update);
router.delete('/:id', authMiddleware, reportController.delete);

module.exports = router; 