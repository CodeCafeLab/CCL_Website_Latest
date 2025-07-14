const careerModel = require('../models/careerModel');
const jobApplicationModel = require('../models/jobApplicationModel');

// Get all careers (admin)
exports.getAllCareers = async (req, res) => {
  try {
    const careers = await careerModel.getAll();
    res.json(careers);
  } catch (error) {
    console.error('Error fetching careers:', error);
    res.status(500).json({ error: 'Failed to fetch careers' });
  }
};

// Get active careers (public)
exports.getActiveCareers = async (req, res) => {
  try {
    const careers = await careerModel.getActive();
    res.json(careers);
  } catch (error) {
    console.error('Error fetching active careers:', error);
    res.status(500).json({ error: 'Failed to fetch careers' });
  }
};

// Get featured careers
exports.getFeaturedCareers = async (req, res) => {
  try {
    const careers = await careerModel.getFeatured();
    res.json(careers);
  } catch (error) {
    console.error('Error fetching featured careers:', error);
    res.status(500).json({ error: 'Failed to fetch featured careers' });
  }
};

// Get single career by ID
exports.getCareerById = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await careerModel.findById(id);
    
    if (!career) {
      return res.status(404).json({ error: 'Career not found' });
    }
    
    // Increment views when accessed
    await careerModel.incrementViews(id);
    
    res.json(career);
  } catch (error) {
    console.error('Error fetching career:', error);
    res.status(500).json({ error: 'Failed to fetch career' });
  }
};

// Get career by slug
exports.getCareerBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const career = await careerModel.findBySlug(slug);
    
    if (!career) {
      return res.status(404).json({ error: 'Career not found' });
    }
    
    // Increment views when accessed
    await careerModel.incrementViews(career.id);
    
    res.json(career);
  } catch (error) {
    console.error('Error fetching career:', error);
    res.status(500).json({ error: 'Failed to fetch career' });
  }
};

// Create new career
exports.createCareer = async (req, res) => {
  try {
    const careerData = {
      ...req.body,
    };

    const careerId = await careerModel.create(careerData);
    const newCareer = await careerModel.findById(careerId);
    
    res.status(201).json(newCareer);
  } catch (error) {
    console.error('Error creating career:', error);
    res.status(500).json({ error: 'Failed to create career' });
  }
};

// Update career
exports.updateCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const success = await careerModel.update(id, updateData);
    
    if (!success) {
      return res.status(404).json({ error: 'Career not found' });
    }
    
    const updatedCareer = await careerModel.findById(id);
    res.json(updatedCareer);
  } catch (error) {
    console.error('Error updating career:', error);
    res.status(500).json({ error: 'Failed to update career' });
  }
};

// Delete career
exports.deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await careerModel.delete(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Career not found' });
    }
    
    res.json({ message: 'Career deleted successfully' });
  } catch (error) {
    console.error('Error deleting career:', error);
    res.status(500).json({ error: 'Failed to delete career' });
  }
}; 