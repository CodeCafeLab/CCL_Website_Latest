const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');

// Public routes
router.get('/active', careerController.getActiveCareers);
router.get('/featured', careerController.getFeaturedCareers);
router.get('/:id', careerController.getCareerById);
router.get('/slug/:slug', careerController.getCareerBySlug);

// All routes are now public (no authentication required)
router.get('/', careerController.getAllCareers);
router.post('/', careerController.createCareer);
router.put('/:id', careerController.updateCareer);
router.delete('/:id', careerController.deleteCareer);

module.exports = router; 