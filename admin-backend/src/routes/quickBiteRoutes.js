const express = require('express');
const router = express.Router();
const quickBiteController = require('../controllers/quickBiteController');

// Public routes
router.get('/', quickBiteController.getAllQuickBites);
router.get('/featured', quickBiteController.getFeaturedQuickBites);
router.get('/:id', quickBiteController.getQuickBiteById);
router.post('/:id/like', quickBiteController.likeQuickBite);

// Routes without authentication middleware
router.post('/', quickBiteController.createQuickBite);
router.put('/:id', quickBiteController.updateQuickBite);
router.delete('/:id', quickBiteController.deleteQuickBite);

module.exports = router; 