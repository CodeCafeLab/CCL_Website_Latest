const quickBiteModel = require('../models/quickBiteModel');

// Get all quick bites
exports.getAllQuickBites = async (req, res) => {
  try {
    const quickBites = await quickBiteModel.getAll();
    res.json(quickBites);
  } catch (error) {
    console.error('Error fetching quick bites:', error);
    res.status(500).json({ error: 'Failed to fetch quick bites' });
  }
};

// Get featured quick bites
exports.getFeaturedQuickBites = async (req, res) => {
  try {
    const quickBites = await quickBiteModel.getFeatured();
    res.json(quickBites);
  } catch (error) {
    console.error('Error fetching featured quick bites:', error);
    res.status(500).json({ error: 'Failed to fetch featured quick bites' });
  }
};

// Get single quick bite by ID
exports.getQuickBiteById = async (req, res) => {
  try {
    const { id } = req.params;
    const quickBite = await quickBiteModel.findById(id);
    
    if (!quickBite) {
      return res.status(404).json({ error: 'Quick bite not found' });
    }
    
    // Increment views when accessed
    await quickBiteModel.incrementViews(id);
    
    res.json(quickBite);
  } catch (error) {
    console.error('Error fetching quick bite:', error);
    res.status(500).json({ error: 'Failed to fetch quick bite' });
  }
};

// Create new quick bite
exports.createQuickBite = async (req, res) => {
  try {
    const quickBiteData = {
      ...req.body,
      author: req.user?.name || 'Admin',
      author_id: req.user?.id || 1,
    };

    const quickBiteId = await quickBiteModel.create(quickBiteData);
    const newQuickBite = await quickBiteModel.findById(quickBiteId);
    
    res.status(201).json(newQuickBite);
  } catch (error) {
    console.error('Error creating quick bite:', error);
    res.status(500).json({ error: 'Failed to create quick bite' });
  }
};

// Update quick bite
exports.updateQuickBite = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const success = await quickBiteModel.update(id, updateData);
    
    if (!success) {
      return res.status(404).json({ error: 'Quick bite not found' });
    }
    
    const updatedQuickBite = await quickBiteModel.findById(id);
    res.json(updatedQuickBite);
  } catch (error) {
    console.error('Error updating quick bite:', error);
    res.status(500).json({ error: 'Failed to update quick bite' });
  }
};

// Delete quick bite
exports.deleteQuickBite = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await quickBiteModel.delete(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Quick bite not found' });
    }
    
    res.json({ message: 'Quick bite deleted successfully' });
  } catch (error) {
    console.error('Error deleting quick bite:', error);
    res.status(500).json({ error: 'Failed to delete quick bite' });
  }
};

// Like a quick bite
exports.likeQuickBite = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await quickBiteModel.incrementLikes(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Quick bite not found' });
    }
    
    res.json({ message: 'Quick bite liked successfully' });
  } catch (error) {
    console.error('Error liking quick bite:', error);
    res.status(500).json({ error: 'Failed to like quick bite' });
  }
}; 