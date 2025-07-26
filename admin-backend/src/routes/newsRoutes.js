const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Public routes
router.get('/featured', newsController.getFeatured);
router.get('/category/:category', newsController.getByCategory);
router.get('/search', newsController.search);

// Routes without authentication middleware
router.get('/', newsController.getAll);
router.get('/:id', newsController.getById);
router.post('/', newsController.create);
router.put('/:id', newsController.update);
router.delete('/:id', newsController.delete);

module.exports = router;