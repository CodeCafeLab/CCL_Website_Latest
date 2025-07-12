const express = require('express');
const router = express.Router();
const caseStudyController = require('../controllers/caseStudyController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/published', caseStudyController.getPublished);
router.get('/featured', caseStudyController.getFeatured);
router.get('/slug/:slug', caseStudyController.getBySlug);

// Protected routes (require authentication)
router.get('/', authMiddleware, caseStudyController.getAll);
router.get('/:id', authMiddleware, caseStudyController.getById);
router.post('/', authMiddleware, caseStudyController.create);
router.put('/:id', authMiddleware, caseStudyController.update);
router.delete('/:id', authMiddleware, caseStudyController.delete);

module.exports = router;