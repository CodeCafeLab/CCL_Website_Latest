const webinarModel = require('../models/webinarModel');

// Get all webinars (admin)
exports.getAll = async (req, res) => {
  try {
    const webinars = await webinarModel.getAll();
    res.json(webinars);
  } catch (error) {
    console.error('Error fetching webinars:', error);
    res.status(500).json({ error: 'Failed to fetch webinars' });
  }
};

// Get upcoming webinars (public)
exports.getUpcoming = async (req, res) => {
  try {
    const webinars = await webinarModel.getUpcoming();
    res.json(webinars);
  } catch (error) {
    console.error('Error fetching upcoming webinars:', error);
    res.status(500).json({ error: 'Failed to fetch webinars' });
  }
};

// Get featured webinars
exports.getFeatured = async (req, res) => {
  try {
    const webinars = await webinarModel.getFeatured();
    res.json(webinars);
  } catch (error) {
    console.error('Error fetching featured webinars:', error);
    res.status(500).json({ error: 'Failed to fetch featured webinars' });
  }
};

// Get completed webinars
exports.getCompleted = async (req, res) => {
  try {
    const webinars = await webinarModel.getCompleted();
    res.json(webinars);
  } catch (error) {
    console.error('Error fetching completed webinars:', error);
    res.status(500).json({ error: 'Failed to fetch completed webinars' });
  }
};

// Get single webinar by ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const webinar = await webinarModel.findById(id);
    
    if (!webinar) {
      return res.status(404).json({ error: 'Webinar not found' });
    }
    
    res.json(webinar);
  } catch (error) {
    console.error('Error fetching webinar:', error);
    res.status(500).json({ error: 'Failed to fetch webinar' });
  }
};

// Get webinar by slug
exports.getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const webinar = await webinarModel.findBySlug(slug);
    
    if (!webinar) {
      return res.status(404).json({ error: 'Webinar not found' });
    }
    
    res.json(webinar);
  } catch (error) {
    console.error('Error fetching webinar:', error);
    res.status(500).json({ error: 'Failed to fetch webinar' });
  }
};

// Create new webinar
exports.create = async (req, res) => {
  try {
    const webinarData = {
      ...req.body,
    };

    const webinarId = await webinarModel.create(webinarData);
    const newWebinar = await webinarModel.findById(webinarId);
    
    res.status(201).json(newWebinar);
  } catch (error) {
    console.error('Error creating webinar:', error);
    res.status(500).json({ error: 'Failed to create webinar' });
  }
};

// Update webinar
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const success = await webinarModel.update(id, updateData);
    
    if (!success) {
      return res.status(404).json({ error: 'Webinar not found' });
    }
    
    const updatedWebinar = await webinarModel.findById(id);
    res.json(updatedWebinar);
  } catch (error) {
    console.error('Error updating webinar:', error);
    res.status(500).json({ error: 'Failed to update webinar' });
  }
};

// Delete webinar
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await webinarModel.delete(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Webinar not found' });
    }
    
    res.json({ message: 'Webinar deleted successfully' });
  } catch (error) {
    console.error('Error deleting webinar:', error);
    res.status(500).json({ error: 'Failed to delete webinar' });
  }
};

// Update webinar status
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const success = await webinarModel.updateStatus(id, status);
    
    if (!success) {
      return res.status(404).json({ error: 'Webinar not found' });
    }
    
    res.json({ message: 'Webinar status updated successfully' });
  } catch (error) {
    console.error('Error updating webinar status:', error);
    res.status(500).json({ error: 'Failed to update webinar status' });
  }
};

// Register for webinar
exports.register = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Increment registration count
    await webinarModel.incrementRegistrations(id);
    
    res.json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering for webinar:', error);
    res.status(500).json({ error: 'Failed to register for webinar' });
  }
};