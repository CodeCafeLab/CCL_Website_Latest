const express = require('express');
const router = express.Router();
const tutorialController = require('../controllers/tutorialController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/published', tutorialController.getPublished);
router.get('/featured', tutorialController.getFeatured);
router.get('/difficulty/:difficulty', tutorialController.getByDifficulty);
router.get('/slug/:slug', tutorialController.getBySlug);

// Protected routes (require authentication)
router.get('/', authMiddleware, tutorialController.getAll);
router.get('/:id', authMiddleware, tutorialController.getById);
router.post('/', authMiddleware, tutorialController.create);
router.put('/:id', authMiddleware, tutorialController.update);
router.delete('/:id', authMiddleware, tutorialController.delete);

module.exports = router;