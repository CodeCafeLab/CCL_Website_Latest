const whyChooseUsModel = require('../models/whyChooseUsModel');

// Get all why choose us items (admin)
exports.getAll = async (req, res) => {
  try {
    const items = await whyChooseUsModel.getAll();
    res.json(items);
  } catch (error) {
    console.error('Error fetching why choose us items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

// Get active why choose us items (public)
exports.getActive = async (req, res) => {
  try {
    const items = await whyChooseUsModel.getActive();
    res.json(items);
  } catch (error) {
    console.error('Error fetching active items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

// Get single item by ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await whyChooseUsModel.findById(id);
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
};

// Create new item
exports.create = async (req, res) => {
  try {
    const itemData = {
      ...req.body,
    };

    const itemId = await whyChooseUsModel.create(itemData);
    const newItem = await whyChooseUsModel.findById(itemId);
    
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Failed to create item' });
  }
};

// Update item
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const success = await whyChooseUsModel.update(id, updateData);
    
    if (!success) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    const updatedItem = await whyChooseUsModel.findById(id);
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Failed to update item' });
  }
};

// Delete item
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await whyChooseUsModel.delete(id);
    
    if (!success) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
};

// Update order
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { order_index } = req.body;

    const success = await whyChooseUsModel.updateOrder(id, order_index);
    
    if (!success) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
}; 