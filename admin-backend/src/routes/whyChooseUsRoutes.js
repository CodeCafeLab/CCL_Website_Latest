const express = require('express');
const router = express.Router();
const whyChooseUsController = require('../controllers/whyChooseUsController');

// Public routes
router.get('/active', whyChooseUsController.getActive);

// Routes without authentication middleware
router.get('/', whyChooseUsController.getAll);
router.get('/:id', whyChooseUsController.getById);
router.post('/', whyChooseUsController.create);
router.put('/:id', whyChooseUsController.update);
router.delete('/:id', whyChooseUsController.delete);
router.put('/:id/order', whyChooseUsController.updateOrder);

module.exports = router;