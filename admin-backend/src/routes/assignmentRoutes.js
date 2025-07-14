const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/published', assignmentController.getPublished);
router.get('/featured', assignmentController.getFeatured);
router.get('/difficulty/:difficulty', assignmentController.getByDifficulty);
router.get('/slug/:slug', assignmentController.getBySlug);

// Protected routes (require authentication)
router.get('/', authMiddleware, assignmentController.getAll);
router.get('/:id', authMiddleware, assignmentController.getById);
router.post('/', authMiddleware, assignmentController.create);
router.put('/:id', authMiddleware, assignmentController.update);
router.delete('/:id', authMiddleware, assignmentController.delete);

module.exports = router; 