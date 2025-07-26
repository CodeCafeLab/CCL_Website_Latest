const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// All routes are now public (no authentication required)
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
