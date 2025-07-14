const express = require('express');
const router = express.Router();
const whyChooseUsController = require('../controllers/whyChooseUsController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/active', whyChooseUsController.getActive);

// Protected routes (require authentication)
router.get('/', authMiddleware, whyChooseUsController.getAll);
router.get('/:id', authMiddleware, whyChooseUsController.getById);
router.post('/', authMiddleware, whyChooseUsController.create);
router.put('/:id', authMiddleware, whyChooseUsController.update);
router.delete('/:id', authMiddleware, whyChooseUsController.delete);
router.put('/:id/order', authMiddleware, whyChooseUsController.updateOrder);

module.exports = router;