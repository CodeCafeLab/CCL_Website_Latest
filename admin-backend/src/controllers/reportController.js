const reportModel = require('../models/reportModel');

// Get all reports (admin)
exports.getAll = async (req, res) => {
  try {
    const reports = await reportModel.getAll();
    res.json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
};

// Get published reports (public)
exports.getPublished = async (req, res) => {
  try {
    const reports = await reportModel.getPublished();
    res.json(reports);
  } catch (error) {
    console.error('Error fetching published reports:', error);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
};

// Get featured reports
exports.getFeatured = async (req, res) => {
  try {
    const reports = await reportModel.getFeatured();
    res.json(reports);
  } catch (error) {
    console.error('Error fetching featured reports:', error);
    res.status(500).json({ error: 'Failed to fetch featured reports' });
  }
};

// Get single report by ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await reportModel.findById(id);
    
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    
    res.json(report);
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({ error: 'Failed to fetch report' });
  }
};

// Get report by slug
exports.getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const report = await reportModel.findBySlug(slug);
    
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    
    res.json(report);
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({ error: 'Failed to fetch report' });
  }
};

// Create new report
exports.create = async (req, res) => {
  try {
    const reportData = {
      ...req.body,
    };

    const reportId = await reportModel.create(reportData);
    const newReport = await reportModel.findById(reportId);
    
    res.status(201).json(newReport);
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'Failed to create report' });
  }
};

// Update report
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const success = await reportModel.update(id, updateData);
    
    if (!success) {
      return res.status(404).json({ error: 'Report not found' });
    }
    
    const updatedReport = await reportModel.findById(id);
    res.json(updatedReport);
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ error: 'Failed to update report' });
  }
};

// Delete report
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await reportModel.delete(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Report not found' });
    }
    
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ error: 'Failed to delete report' });
  }
};

// Download report
exports.download = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await reportModel.findById(id);
    
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    
    // Increment download count
    await reportModel.incrementDownloads(id);
    
    res.json({ 
      message: 'Download initiated',
      file_url: report.file_url 
    });
  } catch (error) {
    console.error('Error downloading report:', error);
    res.status(500).json({ error: 'Failed to download report' });
  }
}; 