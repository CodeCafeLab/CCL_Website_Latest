const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

// Public routes
router.get('/published', assignmentController.getPublished);
router.get('/featured', assignmentController.getFeatured);
router.get('/difficulty/:difficulty', assignmentController.getByDifficulty);
router.get('/slug/:slug', assignmentController.getBySlug);

// Routes without authentication middleware
router.get('/', assignmentController.getAll);
router.get('/:id', assignmentController.getById);
router.post('/', assignmentController.create);
router.put('/:id', assignmentController.update);
router.delete('/:id', assignmentController.delete);

module.exports = router; 