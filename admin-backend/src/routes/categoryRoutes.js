const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
// Removed authMiddleware import - no longer needed

// Routes without authentication middleware
router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.createCategory);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
