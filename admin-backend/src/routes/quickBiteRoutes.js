const express = require('express');
const router = express.Router();
const quickBiteController = require('../controllers/quickBiteController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', quickBiteController.getAllQuickBites);
router.get('/featured', quickBiteController.getFeaturedQuickBites);
router.get('/:id', quickBiteController.getQuickBiteById);
router.post('/:id/like', quickBiteController.likeQuickBite);

// Protected routes (require authentication)
router.post('/', authMiddleware, quickBiteController.createQuickBite);
router.put('/:id', authMiddleware, quickBiteController.updateQuickBite);
router.delete('/:id', authMiddleware, quickBiteController.deleteQuickBite);

module.exports = router; 