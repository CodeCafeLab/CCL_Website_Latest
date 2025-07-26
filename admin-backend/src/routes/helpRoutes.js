const express = require('express');
const router = express.Router();
const helpController = require('../controllers/helpController');

// Public routes
router.get('/published', helpController.getPublished);
router.get('/featured', helpController.getFeatured);
router.get('/category/:category', helpController.getByCategory);
router.get('/slug/:slug', helpController.getBySlug);
router.post('/:id/helpful', helpController.incrementHelpfulVotes);

// Routes without authentication middleware
router.get('/', helpController.getAll);
router.get('/:id', helpController.getById);
router.post('/', helpController.create);
router.put('/:id', helpController.update);
router.delete('/:id', helpController.delete);

module.exports = router;