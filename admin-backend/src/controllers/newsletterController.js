const newsletterModel = require('../models/newsletterModel');

// Get all newsletters (admin)
exports.getAll = async (req, res) => {
  try {
    const newsletters = await newsletterModel.getAll();
    res.json(newsletters);
  } catch (error) {
    console.error('Error fetching newsletters:', error);
    res.status(500).json({ error: 'Failed to fetch newsletters' });
  }
};

// Get scheduled newsletters
exports.getScheduled = async (req, res) => {
  try {
    const newsletters = await newsletterModel.getScheduled();
    res.json(newsletters);
  } catch (error) {
    console.error('Error fetching scheduled newsletters:', error);
    res.status(500).json({ error: 'Failed to fetch scheduled newsletters' });
  }
};

// Get sent newsletters
exports.getSent = async (req, res) => {
  try {
    const newsletters = await newsletterModel.getSent();
    res.json(newsletters);
  } catch (error) {
    console.error('Error fetching sent newsletters:', error);
    res.status(500).json({ error: 'Failed to fetch sent newsletters' });
  }
};

// Get featured newsletters
exports.getFeatured = async (req, res) => {
  try {
    const newsletters = await newsletterModel.getFeatured();
    res.json(newsletters);
  } catch (error) {
    console.error('Error fetching featured newsletters:', error);
    res.status(500).json({ error: 'Failed to fetch featured newsletters' });
  }
};

// Get single newsletter by ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const newsletter = await newsletterModel.findById(id);
    
    if (!newsletter) {
      return res.status(404).json({ error: 'Newsletter not found' });
    }
    
    res.json(newsletter);
  } catch (error) {
    console.error('Error fetching newsletter:', error);
    res.status(500).json({ error: 'Failed to fetch newsletter' });
  }
};

// Get newsletter by slug
exports.getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const newsletter = await newsletterModel.findBySlug(slug);
    
    if (!newsletter) {
      return res.status(404).json({ error: 'Newsletter not found' });
    }
    
    res.json(newsletter);
  } catch (error) {
    console.error('Error fetching newsletter:', error);
    res.status(500).json({ error: 'Failed to fetch newsletter' });
  }
};

// Create new newsletter
exports.create = async (req, res) => {
  try {
    const newsletterData = {
      ...req.body,
    };

    const newsletterId = await newsletterModel.create(newsletterData);
    const newNewsletter = await newsletterModel.findById(newsletterId);
    
    res.status(201).json(newNewsletter);
  } catch (error) {
    console.error('Error creating newsletter:', error);
    res.status(500).json({ error: 'Failed to create newsletter' });
  }
};

// Update newsletter
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const success = await newsletterModel.update(id, updateData);
    
    if (!success) {
      return res.status(404).json({ error: 'Newsletter not found' });
    }
    
    const updatedNewsletter = await newsletterModel.findById(id);
    res.json(updatedNewsletter);
  } catch (error) {
    console.error('Error updating newsletter:', error);
    res.status(500).json({ error: 'Failed to update newsletter' });
  }
};

// Delete newsletter
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await newsletterModel.delete(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Newsletter not found' });
    }
    
    res.json({ message: 'Newsletter deleted successfully' });
  } catch (error) {
    console.error('Error deleting newsletter:', error);
    res.status(500).json({ error: 'Failed to delete newsletter' });
  }
};

// Update newsletter status
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, sent_at } = req.body;

    const success = await newsletterModel.updateStatus(id, status, sent_at);
    
    if (!success) {
      return res.status(404).json({ error: 'Newsletter not found' });
    }
    
    res.json({ message: 'Newsletter status updated successfully' });
  } catch (error) {
    console.error('Error updating newsletter status:', error);
    res.status(500).json({ error: 'Failed to update newsletter status' });
  }
};

// Update newsletter metrics
exports.updateMetrics = async (req, res) => {
  try {
    const { id } = req.params;
    const { open_rate, click_rate } = req.body;

    const success = await newsletterModel.updateMetrics(id, open_rate, click_rate);
    
    if (!success) {
      return res.status(404).json({ error: 'Newsletter not found' });
    }
    
    res.json({ message: 'Newsletter metrics updated successfully' });
  } catch (error) {
    console.error('Error updating newsletter metrics:', error);
    res.status(500).json({ error: 'Failed to update newsletter metrics' });
  }
}; 