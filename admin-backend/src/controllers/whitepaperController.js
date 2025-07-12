const whitepaperModel = require('../models/whitepaperModel');

// Get all whitepapers (admin)
exports.getAll = async (req, res) => {
  try {
    const whitepapers = await whitepaperModel.getAll();
    res.json(whitepapers);
  } catch (error) {
    console.error('Error fetching whitepapers:', error);
    res.status(500).json({ error: 'Failed to fetch whitepapers' });
  }
};

// Get published whitepapers (public)
exports.getPublished = async (req, res) => {
  try {
    const whitepapers = await whitepaperModel.getPublished();
    res.json(whitepapers);
  } catch (error) {
    console.error('Error fetching published whitepapers:', error);
    res.status(500).json({ error: 'Failed to fetch whitepapers' });
  }
};

// Get featured whitepapers
exports.getFeatured = async (req, res) => {
  try {
    const whitepapers = await whitepaperModel.getFeatured();
    res.json(whitepapers);
  } catch (error) {
    console.error('Error fetching featured whitepapers:', error);
    res.status(500).json({ error: 'Failed to fetch featured whitepapers' });
  }
};

// Get single whitepaper by ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const whitepaper = await whitepaperModel.findById(id);
    
    if (!whitepaper) {
      return res.status(404).json({ error: 'Whitepaper not found' });
    }
    
    res.json(whitepaper);
  } catch (error) {
    console.error('Error fetching whitepaper:', error);
    res.status(500).json({ error: 'Failed to fetch whitepaper' });
  }
};

// Get whitepaper by slug
exports.getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const whitepaper = await whitepaperModel.findBySlug(slug);
    
    if (!whitepaper) {
      return res.status(404).json({ error: 'Whitepaper not found' });
    }
    
    res.json(whitepaper);
  } catch (error) {
    console.error('Error fetching whitepaper:', error);
    res.status(500).json({ error: 'Failed to fetch whitepaper' });
  }
};

// Create new whitepaper
exports.create = async (req, res) => {
  try {
    const whitepaperData = {
      ...req.body,
    };

    const whitepaperId = await whitepaperModel.create(whitepaperData);
    const newWhitepaper = await whitepaperModel.findById(whitepaperId);
    
    res.status(201).json(newWhitepaper);
  } catch (error) {
    console.error('Error creating whitepaper:', error);
    res.status(500).json({ error: 'Failed to create whitepaper' });
  }
};

// Update whitepaper
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const success = await whitepaperModel.update(id, updateData);
    
    if (!success) {
      return res.status(404).json({ error: 'Whitepaper not found' });
    }
    
    const updatedWhitepaper = await whitepaperModel.findById(id);
    res.json(updatedWhitepaper);
  } catch (error) {
    console.error('Error updating whitepaper:', error);
    res.status(500).json({ error: 'Failed to update whitepaper' });
  }
};

// Delete whitepaper
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await whitepaperModel.delete(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Whitepaper not found' });
    }
    
    res.json({ message: 'Whitepaper deleted successfully' });
  } catch (error) {
    console.error('Error deleting whitepaper:', error);
    res.status(500).json({ error: 'Failed to delete whitepaper' });
  }
};

// Download whitepaper
exports.download = async (req, res) => {
  try {
    const { id } = req.params;
    const whitepaper = await whitepaperModel.findById(id);
    
    if (!whitepaper) {
      return res.status(404).json({ error: 'Whitepaper not found' });
    }
    
    // Increment download count
    await whitepaperModel.incrementDownloads(id);
    
    res.json({ 
      message: 'Download initiated',
      file_url: whitepaper.file_url 
    });
  } catch (error) {
    console.error('Error downloading whitepaper:', error);
    res.status(500).json({ error: 'Failed to download whitepaper' });
  }
}; 