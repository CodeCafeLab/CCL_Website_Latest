const express = require('express');
const router = express.Router();
const webinarController = require('../controllers/webinarController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/upcoming', webinarController.getUpcoming);
router.get('/featured', webinarController.getFeatured);
router.get('/completed', webinarController.getCompleted);
router.get('/slug/:slug', webinarController.getBySlug);
router.post('/:id/register', webinarController.register);

// Protected routes (require authentication)
router.get('/', authMiddleware, webinarController.getAll);
router.get('/:id', authMiddleware, webinarController.getById);
router.post('/', authMiddleware, webinarController.create);
router.put('/:id', authMiddleware, webinarController.update);
router.delete('/:id', authMiddleware, webinarController.delete);
router.put('/:id/status', authMiddleware, webinarController.updateStatus);

module.exports = router; 