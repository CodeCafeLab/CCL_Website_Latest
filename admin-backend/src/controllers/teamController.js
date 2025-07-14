const teamModel = require('../models/teamModel');

// Get all team members (admin)
exports.getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await teamModel.getAll();
    res.json(teamMembers);
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
};

// Get active team members (public)
exports.getActiveTeamMembers = async (req, res) => {
  try {
    const teamMembers = await teamModel.getActive();
    res.json(teamMembers);
  } catch (error) {
    console.error('Error fetching active team members:', error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
};

// Get featured team members
exports.getFeaturedTeamMembers = async (req, res) => {
  try {
    const teamMembers = await teamModel.getFeatured();
    res.json(teamMembers);
  } catch (error) {
    console.error('Error fetching featured team members:', error);
    res.status(500).json({ error: 'Failed to fetch featured team members' });
  }
};

// Get single team member by ID
exports.getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const teamMember = await teamModel.findById(id);
    
    if (!teamMember) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json(teamMember);
  } catch (error) {
    console.error('Error fetching team member:', error);
    res.status(500).json({ error: 'Failed to fetch team member' });
  }
};

// Create new team member
exports.createTeamMember = async (req, res) => {
  try {
    const teamData = {
      ...req.body,
    };

    const teamMemberId = await teamModel.create(teamData);
    const newTeamMember = await teamModel.findById(teamMemberId);
    
    res.status(201).json(newTeamMember);
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(500).json({ error: 'Failed to create team member' });
  }
};

// Update team member
exports.updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const success = await teamModel.update(id, updateData);
    
    if (!success) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    const updatedTeamMember = await teamModel.findById(id);
    res.json(updatedTeamMember);
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(500).json({ error: 'Failed to update team member' });
  }
};

// Delete team member
exports.deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await teamModel.delete(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ error: 'Failed to delete team member' });
  }
};

// Update team member sort order
exports.updateSortOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { sort_order } = req.body;

    const success = await teamModel.updateSortOrder(id, sort_order);
    
    if (!success) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    
    res.json({ message: 'Sort order updated successfully' });
  } catch (error) {
    console.error('Error updating sort order:', error);
    res.status(500).json({ error: 'Failed to update sort order' });
  }
}; 