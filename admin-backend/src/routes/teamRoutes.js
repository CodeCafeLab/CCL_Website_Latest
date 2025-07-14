const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/active', teamController.getActiveTeamMembers);
router.get('/featured', teamController.getFeaturedTeamMembers);
router.get('/:id', teamController.getTeamMemberById);

// Protected routes (require authentication)
router.get('/', authMiddleware, teamController.getAllTeamMembers);
router.post('/', authMiddleware, teamController.createTeamMember);
router.put('/:id', authMiddleware, teamController.updateTeamMember);
router.delete('/:id', authMiddleware, teamController.deleteTeamMember);
router.put('/:id/sort', authMiddleware, teamController.updateSortOrder);

module.exports = router; 