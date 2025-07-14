const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');

// Public routes
router.post('/', quoteController.createQuote);
router.get('/', quoteController.getQuotes);

module.exports = router;
