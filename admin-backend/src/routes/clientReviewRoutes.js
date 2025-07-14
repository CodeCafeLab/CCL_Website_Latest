const express = require('express');
const router = express.Router();
const clientReviewController = require('../controllers/clientReviewController');
const authMiddleware = require('../middleware/authMiddleware');

// Public
router.get('/', clientReviewController.getAllReviews);

// Admin (protected)
router.post('/', authMiddleware, clientReviewController.createReview);
router.put('/:id', authMiddleware, clientReviewController.updateReview);
router.delete('/:id', authMiddleware, clientReviewController.deleteReview);

module.exports = router;
