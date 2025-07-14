const express = require('express');
const router = express.Router();
const jobApplicationController = require('../controllers/jobApplicationController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.post('/', jobApplicationController.submitApplication);

// Protected routes (require authentication)
router.get('/', authMiddleware, jobApplicationController.getAllApplications);
router.get('/stats', authMiddleware, jobApplicationController.getApplicationStats);
router.get('/job/:jobId', authMiddleware, jobApplicationController.getApplicationsByJobId);
router.get('/:id', authMiddleware, jobApplicationController.getApplicationById);
router.put('/:id', authMiddleware, jobApplicationController.updateApplication);
router.delete('/:id', authMiddleware, jobApplicationController.deleteApplication);

module.exports = router;