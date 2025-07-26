const express = require('express');
const router = express.Router();
const clientReviewController = require('../controllers/clientReviewController');

// Public
router.get('/', clientReviewController.getAllReviews);

// Routes without authentication middleware
router.post('/', clientReviewController.createReview);
router.put('/:id', clientReviewController.updateReview);
router.delete('/:id', clientReviewController.deleteReview);

module.exports = router;
