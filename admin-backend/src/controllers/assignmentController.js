const assignmentModel = require('../models/assignmentModel');

// Get all assignments (admin)
exports.getAll = async (req, res) => {
  try {
    const assignments = await assignmentModel.getAll();
    res.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
};

// Get published assignments (public)
exports.getPublished = async (req, res) => {
  try {
    const assignments = await assignmentModel.getPublished();
    res.json(assignments);
  } catch (error) {
    console.error('Error fetching published assignments:', error);
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
};

// Get featured assignments
exports.getFeatured = async (req, res) => {
  try {
    const assignments = await assignmentModel.getFeatured();
    res.json(assignments);
  } catch (error) {
    console.error('Error fetching featured assignments:', error);
    res.status(500).json({ error: 'Failed to fetch featured assignments' });
  }
};

// Get assignments by difficulty
exports.getByDifficulty = async (req, res) => {
  try {
    const { difficulty } = req.params;
    const assignments = await assignmentModel.getByDifficulty(difficulty);
    res.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments by difficulty:', error);
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
};

// Get single assignment by ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await assignmentModel.findById(id);
    
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    
    res.json(assignment);
  } catch (error) {
    console.error('Error fetching assignment:', error);
    res.status(500).json({ error: 'Failed to fetch assignment' });
  }
};

// Get assignment by slug
exports.getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const assignment = await assignmentModel.findBySlug(slug);
    
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    
    res.json(assignment);
  } catch (error) {
    console.error('Error fetching assignment:', error);
    res.status(500).json({ error: 'Failed to fetch assignment' });
  }
};

// Create new assignment
exports.create = async (req, res) => {
  try {
    const assignmentData = {
      ...req.body,
    };

    const assignmentId = await assignmentModel.create(assignmentData);
    const newAssignment = await assignmentModel.findById(assignmentId);
    
    res.status(201).json(newAssignment);
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).json({ error: 'Failed to create assignment' });
  }
};

// Update assignment
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const success = await assignmentModel.update(id, updateData);
    
    if (!success) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    
    const updatedAssignment = await assignmentModel.findById(id);
    res.json(updatedAssignment);
  } catch (error) {
    console.error('Error updating assignment:', error);
    res.status(500).json({ error: 'Failed to update assignment' });
  }
};

// Delete assignment
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await assignmentModel.delete(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    
    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    console.error('Error deleting assignment:', error);
    res.status(500).json({ error: 'Failed to delete assignment' });
  }
}; 