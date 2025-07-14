const productModel = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    // Destructure all fields from req.body
    const {
      name, slug, short_description, description, price, discount_price,
      image_url, gallery, stock, sku, brand, category, tags, status,
      is_featured, weight, dimensions, meta_title, meta_description
    } = req.body;

    if (!name || !slug || !price) {
      return res.status(400).json({ message: 'Name, slug, and price are required.' });
    }

    const product = {
      name, slug, short_description, description, price, discount_price,
      image_url, gallery, stock, sku, brand, category, tags, status,
      is_featured, weight, dimensions, meta_title, meta_description
    };

    console.log("Creating product:", product);
    const id = await productModel.create(product);
    res.status(201).json({ id, ...product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // Destructure all fields from req.body
    const {
      name, slug, short_description, description, price, discount_price,
      image_url, gallery, stock, sku, brand, category, tags, status,
      is_featured, weight, dimensions, meta_title, meta_description
    } = req.body;

    const product = {
      name, slug, short_description, description, price, discount_price,
      image_url, gallery, stock, sku, brand, category, tags, status,
      is_featured, weight, dimensions, meta_title, meta_description
    };

    const success = await productModel.update(id, product);
    if (!success) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await productModel.delete(id);
    if (!success) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
