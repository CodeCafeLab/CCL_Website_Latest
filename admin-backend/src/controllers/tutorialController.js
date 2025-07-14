const tutorialModel = require('../models/tutorialModel');

// Get all tutorials (admin)
exports.getAll = async (req, res) => {
  try {
    const tutorials = await tutorialModel.getAll();
    res.json(tutorials);
  } catch (error) {
    console.error('Error fetching tutorials:', error);
    res.status(500).json({ error: 'Failed to fetch tutorials' });
  }
};

// Get published tutorials (public)
exports.getPublished = async (req, res) => {
  try {
    const tutorials = await tutorialModel.getPublished();
    res.json(tutorials);
  } catch (error) {
    console.error('Error fetching published tutorials:', error);
    res.status(500).json({ error: 'Failed to fetch tutorials' });
  }
};

// Get featured tutorials
exports.getFeatured = async (req, res) => {
  try {
    const tutorials = await tutorialModel.getFeatured();
    res.json(tutorials);
  } catch (error) {
    console.error('Error fetching featured tutorials:', error);
    res.status(500).json({ error: 'Failed to fetch featured tutorials' });
  }
};

// Get tutorials by difficulty
exports.getByDifficulty = async (req, res) => {
  try {
    const { difficulty } = req.params;
    const tutorials = await tutorialModel.getByDifficulty(difficulty);
    res.json(tutorials);
  } catch (error) {
    console.error('Error fetching tutorials by difficulty:', error);
    res.status(500).json({ error: 'Failed to fetch tutorials' });
  }
};

// Get single tutorial by ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const tutorial = await tutorialModel.findById(id);
    
    if (!tutorial) {
      return res.status(404).json({ error: 'Tutorial not found' });
    }
    
    // Increment views when accessed
    await tutorialModel.incrementViews(id);
    
    res.json(tutorial);
  } catch (error) {
    console.error('Error fetching tutorial:', error);
    res.status(500).json({ error: 'Failed to fetch tutorial' });
  }
};

// Get tutorial by slug
exports.getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const tutorial = await tutorialModel.findBySlug(slug);
    
    if (!tutorial) {
      return res.status(404).json({ error: 'Tutorial not found' });
    }
    
    // Increment views when accessed
    await tutorialModel.incrementViews(tutorial.id);
    
    res.json(tutorial);
  } catch (error) {
    console.error('Error fetching tutorial:', error);
    res.status(500).json({ error: 'Failed to fetch tutorial' });
  }
};

// Create new tutorial
exports.create = async (req, res) => {
  try {
    const tutorialData = {
      ...req.body,
    };

    const tutorialId = await tutorialModel.create(tutorialData);
    const newTutorial = await tutorialModel.findById(tutorialId);
    
    res.status(201).json(newTutorial);
  } catch (error) {
    console.error('Error creating tutorial:', error);
    res.status(500).json({ error: 'Failed to create tutorial' });
  }
};

// Update tutorial
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const success = await tutorialModel.update(id, updateData);
    
    if (!success) {
      return res.status(404).json({ error: 'Tutorial not found' });
    }
    
    const updatedTutorial = await tutorialModel.findById(id);
    res.json(updatedTutorial);
  } catch (error) {
    console.error('Error updating tutorial:', error);
    res.status(500).json({ error: 'Failed to update tutorial' });
  }
};

// Delete tutorial
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await tutorialModel.delete(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Tutorial not found' });
    }
    
    res.json({ message: 'Tutorial deleted successfully' });
  } catch (error) {
    console.error('Error deleting tutorial:', error);
    res.status(500).json({ error: 'Failed to delete tutorial' });
  }
};