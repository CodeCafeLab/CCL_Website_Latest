const express = require('express');
const router = express.Router();
const { getOriginalUrl } = require('../utils/urlShortener');

// Route to redirect short image URLs to original URLs
router.get('/:shortHash', async (req, res) => {
  try {
    const { shortHash } = req.params;
    
    const originalUrl = await getOriginalUrl(shortHash);
    
    if (!originalUrl) {
      return res.status(404).json({ message: 'Image not found' });
    }
    
    // Redirect to the original image URL
    res.redirect(originalUrl);
  } catch (error) {
    console.error('Error redirecting image:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 