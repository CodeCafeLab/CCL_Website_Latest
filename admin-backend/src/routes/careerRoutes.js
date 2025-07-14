const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/active', careerController.getActiveCareers);
router.get('/featured', careerController.getFeaturedCareers);
router.get('/:id', careerController.getCareerById);
router.get('/slug/:slug', careerController.getCareerBySlug);

// Protected routes (require authentication)
router.get('/', authMiddleware, careerController.getAllCareers);
router.post('/', authMiddleware, careerController.createCareer);
router.put('/:id', authMiddleware, careerController.updateCareer);
router.delete('/:id', authMiddleware, careerController.deleteCareer);

module.exports = router; 