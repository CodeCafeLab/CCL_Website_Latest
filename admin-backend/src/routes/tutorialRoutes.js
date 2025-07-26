const express = require('express');
const router = express.Router();
const tutorialController = require('../controllers/tutorialController');

// Public routes
router.get('/published', tutorialController.getPublished);
router.get('/featured', tutorialController.getFeatured);
router.get('/difficulty/:difficulty', tutorialController.getByDifficulty);
router.get('/slug/:slug', tutorialController.getBySlug);

// Routes without authentication middleware
router.get('/', tutorialController.getAll);
router.get('/:id', tutorialController.getById);
router.post('/', tutorialController.create);
router.put('/:id', tutorialController.update);
router.delete('/:id', tutorialController.delete);

module.exports = router;