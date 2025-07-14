const helpModel = require('../models/helpModel');

// Get all help articles (admin)
exports.getAll = async (req, res) => {
  try {
    const helpArticles = await helpModel.getAll();
    res.json(helpArticles);
  } catch (error) {
    console.error('Error fetching help articles:', error);
    res.status(500).json({ error: 'Failed to fetch help articles' });
  }
};

// Get published help articles (public)
exports.getPublished = async (req, res) => {
  try {
    const helpArticles = await helpModel.getPublished();
    res.json(helpArticles);
  } catch (error) {
    console.error('Error fetching published help articles:', error);
    res.status(500).json({ error: 'Failed to fetch help articles' });
  }
};

// Get featured help articles
exports.getFeatured = async (req, res) => {
  try {
    const helpArticles = await helpModel.getFeatured();
    res.json(helpArticles);
  } catch (error) {
    console.error('Error fetching featured help articles:', error);
    res.status(500).json({ error: 'Failed to fetch featured help articles' });
  }
};

// Get help articles by category
exports.getByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const helpArticles = await helpModel.getByCategory(category);
    res.json(helpArticles);
  } catch (error) {
    console.error('Error fetching help articles by category:', error);
    res.status(500).json({ error: 'Failed to fetch help articles' });
  }
};

// Get single help article by ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const helpArticle = await helpModel.findById(id);
    
    if (!helpArticle) {
      return res.status(404).json({ error: 'Help article not found' });
    }
    
    // Increment views when accessed
    await helpModel.incrementViews(id);
    
    res.json(helpArticle);
  } catch (error) {
    console.error('Error fetching help article:', error);
    res.status(500).json({ error: 'Failed to fetch help article' });
  }
};

// Get help article by slug
exports.getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const helpArticle = await helpModel.findBySlug(slug);
    
    if (!helpArticle) {
      return res.status(404).json({ error: 'Help article not found' });
    }
    
    // Increment views when accessed
    await helpModel.incrementViews(helpArticle.id);
    
    res.json(helpArticle);
  } catch (error) {
    console.error('Error fetching help article:', error);
    res.status(500).json({ error: 'Failed to fetch help article' });
  }
};

// Create new help article
exports.create = async (req, res) => {
  try {
    const helpArticleData = {
      ...req.body,
    };

    const helpArticleId = await helpModel.create(helpArticleData);
    const newHelpArticle = await helpModel.findById(helpArticleId);
    
    res.status(201).json(newHelpArticle);
  } catch (error) {
    console.error('Error creating help article:', error);
    res.status(500).json({ error: 'Failed to create help article' });
  }
};

// Update help article
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const success = await helpModel.update(id, updateData);
    
    if (!success) {
      return res.status(404).json({ error: 'Help article not found' });
    }
    
    const updatedHelpArticle = await helpModel.findById(id);
    res.json(updatedHelpArticle);
  } catch (error) {
    console.error('Error updating help article:', error);
    res.status(500).json({ error: 'Failed to update help article' });
  }
};

// Delete help article
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await helpModel.delete(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Help article not found' });
    }
    
    res.json({ message: 'Help article deleted successfully' });
  } catch (error) {
    console.error('Error deleting help article:', error);
    res.status(500).json({ error: 'Failed to delete help article' });
  }
};

// Increment helpful votes
exports.incrementHelpfulVotes = async (req, res) => {
  try {
    const { id } = req.params;
    
    const success = await helpModel.incrementHelpfulVotes(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Help article not found' });
    }
    
    res.json({ message: 'Vote recorded successfully' });
  } catch (error) {
    console.error('Error recording helpful vote:', error);
    res.status(500).json({ error: 'Failed to record vote' });
  }
};