const categoryModel = require('../models/categoryModel');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.getAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, slug, description } = req.body;
    if (!name || !slug) {
      return res.status(400).json({ message: 'Name and slug are required.' });
    }
    const category = { name, slug, description, created_at: new Date() };
    const id = await categoryModel.create(category);
    res.status(201).json({ id, ...category });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findById(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description } = req.body;
    const success = await categoryModel.update(id, { name, slug, description });
    if (!success) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await categoryModel.delete(id);
    if (!success) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
