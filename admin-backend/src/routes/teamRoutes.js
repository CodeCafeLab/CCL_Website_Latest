const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// Public routes
router.get('/active', teamController.getActiveTeamMembers);
router.get('/featured', teamController.getFeaturedTeamMembers);
router.get('/', teamController.getAllTeamMembers);
router.get('/:id', teamController.getTeamMemberById);
router.post('/', teamController.createTeamMember);
router.put('/:id', teamController.updateTeamMember);
router.delete('/:id', teamController.deleteTeamMember);
router.put('/:id/sort', teamController.updateSortOrder);

module.exports = router; 