const express = require('express');
const router = express.Router();
const webinarController = require('../controllers/webinarController');

// Public routes
router.get('/upcoming', webinarController.getUpcoming);
router.get('/featured', webinarController.getFeatured);
router.get('/completed', webinarController.getCompleted);
router.get('/slug/:slug', webinarController.getBySlug);

// All routes are now public (no authentication required)
router.get('/', webinarController.getAll);
router.get('/:id', webinarController.getById);
router.post('/', webinarController.create);
router.put('/:id', webinarController.update);
router.delete('/:id', webinarController.delete);
router.put('/:id/status', webinarController.updateStatus);
router.post('/:id/register', webinarController.register);

module.exports = router; 