const jobApplicationModel = require('../models/jobApplicationModel');
const careerModel = require('../models/careerModel');

// Get all applications (admin)
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await jobApplicationModel.getAll();
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};

// Get applications by job ID
exports.getApplicationsByJobId = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await jobApplicationModel.getByJobId(jobId);
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};

// Get application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await jobApplicationModel.findById(id);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    res.json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ error: 'Failed to fetch application' });
  }
};

// Submit job application
exports.submitApplication = async (req, res) => {
  try {
    const applicationData = {
      ...req.body,
    };

    // Validate required fields
    if (!applicationData.job_id || !applicationData.applicant_name || !applicationData.applicant_email) {
      return res.status(400).json({ error: 'Job ID, name, and email are required' });
    }

    // Check if career exists
    const career = await careerModel.findById(applicationData.job_id);
    if (!career) {
      return res.status(404).json({ error: 'Career not found' });
    }

    // Check if career is active
    if (career.status !== 'active') {
      return res.status(400).json({ error: 'This position is not currently accepting applications' });
    }

    const applicationId = await jobApplicationModel.create(applicationData);
    
    // Increment applications count for the career
    await careerModel.incrementApplications(applicationData.job_id);
    
    const newApplication = await jobApplicationModel.findById(applicationId);
    
    res.status(201).json({
      message: 'Application submitted successfully',
      application: newApplication
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
};

// Update application status (admin)
exports.updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const success = await jobApplicationModel.update(id, updateData);
    
    if (!success) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    const updatedApplication = await jobApplicationModel.findById(id);
    res.json(updatedApplication);
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ error: 'Failed to update application' });
  }
};

// Delete application
exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await jobApplicationModel.delete(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ error: 'Failed to delete application' });
  }
};

// Get application statistics
exports.getApplicationStats = async (req, res) => {
  try {
    const stats = await jobApplicationModel.getStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching application stats:', error);
    res.status(500).json({ error: 'Failed to fetch application stats' });
  }
}; 