const express = require('express');
const router = express.Router();
const helpController = require('../controllers/helpController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/published', helpController.getPublished);
router.get('/featured', helpController.getFeatured);
router.get('/category/:category', helpController.getByCategory);
router.get('/slug/:slug', helpController.getBySlug);
router.post('/:id/helpful', helpController.incrementHelpfulVotes);

// Protected routes (require authentication)
router.get('/', authMiddleware, helpController.getAll);
router.get('/:id', authMiddleware, helpController.getById);
router.post('/', authMiddleware, helpController.create);
router.put('/:id', authMiddleware, helpController.update);
router.delete('/:id', authMiddleware, helpController.delete);

module.exports = router;