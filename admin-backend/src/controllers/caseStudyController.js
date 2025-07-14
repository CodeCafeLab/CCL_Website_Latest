const caseStudyModel = require('../models/caseStudyModel');

// Get all case studies (admin)
exports.getAll = async (req, res) => {
  try {
    const caseStudies = await caseStudyModel.getAll();
    res.json(caseStudies);
  } catch (error) {
    console.error('Error fetching case studies:', error);
    res.status(500).json({ error: 'Failed to fetch case studies' });
  }
};

// Get published case studies (public)
exports.getPublished = async (req, res) => {
  try {
    const caseStudies = await caseStudyModel.getPublished();
    res.json(caseStudies);
  } catch (error) {
    console.error('Error fetching published case studies:', error);
    res.status(500).json({ error: 'Failed to fetch case studies' });
  }
};

// Get featured case studies
exports.getFeatured = async (req, res) => {
  try {
    const caseStudies = await caseStudyModel.getFeatured();
    res.json(caseStudies);
  } catch (error) {
    console.error('Error fetching featured case studies:', error);
    res.status(500).json({ error: 'Failed to fetch featured case studies' });
  }
};

// Get single case study by ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const caseStudy = await caseStudyModel.findById(id);
    
    if (!caseStudy) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    
    // Increment views when accessed
    await caseStudyModel.incrementViews(id);
    
    res.json(caseStudy);
  } catch (error) {
    console.error('Error fetching case study:', error);
    res.status(500).json({ error: 'Failed to fetch case study' });
  }
};

// Get case study by slug
exports.getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const caseStudy = await caseStudyModel.findBySlug(slug);
    
    if (!caseStudy) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    
    // Increment views when accessed
    await caseStudyModel.incrementViews(caseStudy.id);
    
    res.json(caseStudy);
  } catch (error) {
    console.error('Error fetching case study:', error);
    res.status(500).json({ error: 'Failed to fetch case study' });
  }
};

// Create new case study
exports.create = async (req, res) => {
  try {
    const caseStudyData = {
      ...req.body,
    };

    const caseStudyId = await caseStudyModel.create(caseStudyData);
    const newCaseStudy = await caseStudyModel.findById(caseStudyId);
    
    res.status(201).json(newCaseStudy);
  } catch (error) {
    console.error('Error creating case study:', error);
    res.status(500).json({ error: 'Failed to create case study' });
  }
};

// Update case study
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const success = await caseStudyModel.update(id, updateData);
    
    if (!success) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    
    const updatedCaseStudy = await caseStudyModel.findById(id);
    res.json(updatedCaseStudy);
  } catch (error) {
    console.error('Error updating case study:', error);
    res.status(500).json({ error: 'Failed to update case study' });
  }
};

// Delete case study
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await caseStudyModel.delete(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Case study not found' });
    }
    
    res.json({ message: 'Case study deleted successfully' });
  } catch (error) {
    console.error('Error deleting case study:', error);
    res.status(500).json({ error: 'Failed to delete case study' });
  }
}; 