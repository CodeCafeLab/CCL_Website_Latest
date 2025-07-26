const express = require('express');
const router = express.Router();
const caseStudyController = require('../controllers/caseStudyController');

// Public routes
router.get('/published', caseStudyController.getPublished);
router.get('/featured', caseStudyController.getFeatured);

// All routes are now public (no authentication required)
router.get('/', caseStudyController.getAll);
router.get('/:id', caseStudyController.getById);
router.get('/slug/:slug', caseStudyController.getBySlug);
router.post('/', caseStudyController.create);
router.put('/:id', caseStudyController.update);
router.delete('/:id', caseStudyController.delete);

module.exports = router;