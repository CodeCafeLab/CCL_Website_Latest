// === .env ===
const BASE_URL = process.env.NEXT_APP_API_BASE_URL;

// === src/utils/urlShortener.js ===
const crypto = require('crypto');
const UrlMapping = require('../models/urlMappingModel');

function generateShortHash(originalUrl, blogId) {
return crypto.createHash('md5').update(originalUrl + blogId).digest('hex').substring(0, 8);
}

async function getOrCreateShortUrl(originalUrl, blogId) {
const existing = await UrlMapping.findOne({
where: {
original_url: originalUrl,
blog_id: blogId,
},
});

if (existing) return existing.short_hash;

const shortHash = generateShortHash(originalUrl, blogId);

await UrlMapping.create({
short_hash: shortHash,
original_url: originalUrl,
blog_id: blogId,
});

return shortHash;
}

module.exports = { getOrCreateShortUrl };

// === src/models/urlMappingModel.js ===
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UrlMapping = sequelize.define('url_mappings', {
short_hash: {
type: DataTypes.STRING(8),
allowNull: false,
unique: true,
},
original_url: {
type: DataTypes.TEXT,
allowNull: false,
},
blog_id: {
type: DataTypes.INTEGER,
allowNull: false,
},
}, {
timestamps: true,
createdAt: 'created_at',
updatedAt: false,
indexes: [
{ fields: ['short_hash'] },
{ fields: ['blog_id'] },
{ fields: ['original_url'] },
],
});

module.exports = UrlMapping;

// === src/routes/imageRoutes.js ===
const express = require('express');
const router = express.Router();
const UrlMapping = require('../models/urlMappingModel');

router.get('/:shortHash', async (req, res) => {
try {
const mapping = await UrlMapping.findOne({ where: { short_hash: req.params.shortHash } });
if (!mapping) return res.status(404).json({ message: 'Image not found' });
return res.redirect(mapping.original_url);
} catch (error) {
console.error('Redirect error:', error);
return res.status(500).json({ message: 'Internal server error' });
}
});

module.exports = router;

// === src/controllers/blogController.js ===
const { getOrCreateShortUrl } = require('../utils/urlShortener');
const Blog = require('../models/blogModel');
const BASE_URL = process.env.BASE_URL;

exports.getAllBlogs = async (req, res) => {
try {
const blogs = await Blog.findAll();

    const blogsWithShortUrls = await Promise.all(
      blogs.map(async (blog) => {
        const coverHash = await getOrCreateShortUrl(blog.coverImage, blog.id);
        const thumbHash = await getOrCreateShortUrl(blog.thumbnail, blog.id);

        return {
          ...blog.toJSON(),
          coverImageShortUrl: `${BASE_URL}/images/${coverHash}`,
          thumbnailShortUrl: `${BASE_URL}/images/${thumbHash}`,
        };
      })
    );

    res.status(200).json(blogsWithShortUrls);

} catch (error) {
console.error('Error fetching blogs:', error);
res.status(500).json({ message: 'Internal server error' });
}
};

// === src/app.js (partial) ===
const express = require('express');
require('dotenv').config();
const imageRoutes = require('./routes/imageRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
app.use(express.json());

app.use('/api/images', imageRoutes);
app.use('/api/blogs', blogRoutes);

module.exports = app;

// === setup-url-mappings.sql ===
-- Create URL mappings table for short image URLs
CREATE TABLE IF NOT EXISTS url_mappings (
id INT AUTO_INCREMENT PRIMARY KEY,
short_hash VARCHAR(8) NOT NULL UNIQUE,
original_url TEXT NOT NULL,
blog_id INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
INDEX idx_short_hash (short_hash),
INDEX idx_blog_id (blog_id),
INDEX idx_original_url_blog (original_url(255), blog_id)
);

// === test-url-shortener.js ===
require('dotenv').config();
const axios = require('axios');

(async () => {
const BASE_URL = process.env.BASE_URL;
try {
const response = await axios.get(`${BASE_URL}/blogs`);
console.log('Blogs with short URLs:', response.data);
} catch (err) {
console.error('Test failed:', err.response?.data || err.message);
}
})();
