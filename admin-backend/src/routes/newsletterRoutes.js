const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');

// Public routes
router.get('/featured', newsletterController.getFeatured);
router.get('/slug/:slug', newsletterController.getBySlug);

// Protected routes (require authentication)
router.get('/', newsletterController.getAll);
router.get('/scheduled', newsletterController.getScheduled);
router.get('/sent', newsletterController.getSent);
router.get('/:id', newsletterController.getById);
router.post('/', newsletterController.create);
router.put('/:id', newsletterController.update);
router.delete('/:id', newsletterController.delete);
router.put('/:id/status', newsletterController.updateStatus);
router.put('/:id/metrics', newsletterController.updateMetrics);

module.exports = router;