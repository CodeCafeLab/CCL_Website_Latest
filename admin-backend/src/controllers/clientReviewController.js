const clientReviewModel = require('../models/clientReviewModel');

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await clientReviewModel.getAll();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { client_name, review_text, rating, avatar_url, published } = req.body;
    if (!client_name || !review_text || !rating) {
      return res.status(400).json({ message: 'Name, review, and rating required.' });
    }
    const review = { client_name, review_text, rating, avatar_url, published };
    const id = await clientReviewModel.create(review);
    res.status(201).json({ id, ...review });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { client_name, review_text, rating, avatar_url, published } = req.body;
    const success = await clientReviewModel.update(id, { client_name, review_text, rating, avatar_url, published });
    if (!success) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await clientReviewModel.delete(id);
    if (!success) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
