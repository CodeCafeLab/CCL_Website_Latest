const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/featured', newsletterController.getFeatured);
router.get('/slug/:slug', newsletterController.getBySlug);

// Protected routes (require authentication)
router.get('/', authMiddleware, newsletterController.getAll);
router.get('/scheduled', authMiddleware, newsletterController.getScheduled);
router.get('/sent', authMiddleware, newsletterController.getSent);
router.get('/:id', authMiddleware, newsletterController.getById);
router.post('/', authMiddleware, newsletterController.create);
router.put('/:id', authMiddleware, newsletterController.update);
router.delete('/:id', authMiddleware, newsletterController.delete);
router.put('/:id/status', authMiddleware, newsletterController.updateStatus);
router.put('/:id/metrics', authMiddleware, newsletterController.updateMetrics);

module.exports = router;