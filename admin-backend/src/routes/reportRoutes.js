const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Public routes
router.get('/published', reportController.getPublished);
router.get('/featured', reportController.getFeatured);
router.get('/slug/:slug', reportController.getBySlug);
router.post('/:id/download', reportController.download);

// Routes without authentication middleware
router.get('/', reportController.getAll);
router.get('/:id', reportController.getById);
router.post('/', reportController.create);
router.put('/:id', reportController.update);
router.delete('/:id', reportController.delete);

module.exports = router; 