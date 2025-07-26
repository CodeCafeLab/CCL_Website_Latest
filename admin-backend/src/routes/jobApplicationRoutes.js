const express = require('express');
const router = express.Router();
const jobApplicationController = require('../controllers/jobApplicationController');

// Public routes
router.post('/', jobApplicationController.submitApplication);

// Routes without authentication middleware
router.get('/', jobApplicationController.getAllApplications);
router.get('/stats', jobApplicationController.getApplicationStats);
router.get('/job/:jobId', jobApplicationController.getApplicationsByJobId);
router.get('/:id', jobApplicationController.getApplicationById);
router.put('/:id', jobApplicationController.updateApplication);
router.delete('/:id', jobApplicationController.deleteApplication);

module.exports = router;