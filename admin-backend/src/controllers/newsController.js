const newsModel = require('../models/newsModel');

// Get all news (admin)
exports.getAll = async (req, res) => {
  try {
    const news = await newsModel.getAll();
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};

// Get published news (public)
exports.getPublished = async (req, res) => {
  try {
    const news = await newsModel.getPublished();
    res.json(news);
  } catch (error) {
    console.error('Error fetching published news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};

// Get featured news
exports.getFeatured = async (req, res) => {
  try {
    const news = await newsModel.getFeatured();
    res.json(news);
  } catch (error) {
    console.error('Error fetching featured news:', error);
    res.status(500).json({ error: 'Failed to fetch featured news' });
  }
};

// Get single news by ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await newsModel.findById(id);
    
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    
    // Increment views when accessed
    await newsModel.incrementViews(id);
    
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};

// Get news by slug
exports.getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const news = await newsModel.findBySlug(slug);
    
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    
    // Increment views when accessed
    await newsModel.incrementViews(news.id);
    
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};

// Get news by category
exports.getByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const news = await newsModel.getByCategory(category);
    res.json(news);
  } catch (error) {
    console.error('Error fetching news by category:', error);
    res.status(500).json({ error: 'Failed to fetch news by category' });
  }
};

// Search news
exports.search = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    const news = await newsModel.search(q);
    res.json(news);
  } catch (error) {
    console.error('Error searching news:', error);
    res.status(500).json({ error: 'Failed to search news' });
  }
};

// Create new news
exports.create = async (req, res) => {
  try {
    const newsData = {
      ...req.body,
    };

    const newsId = await newsModel.create(newsData);
    const newNews = await newsModel.findById(newsId);
    
    res.status(201).json(newNews);
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ error: 'Failed to create news' });
  }
};

// Update news
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const success = await newsModel.update(id, updateData);
    
    if (!success) {
      return res.status(404).json({ error: 'News not found' });
    }
    
    const updatedNews = await newsModel.findById(id);
    res.json(updatedNews);
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ error: 'Failed to update news' });
  }
};

// Delete news
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await newsModel.delete(id);
    
    if (!success) {
      return res.status(404).json({ error: 'News not found' });
    }
    
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ error: 'Failed to delete news' });
  }
}; 