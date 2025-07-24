const crypto = require("crypto");
const urlMappingModel = require("../models/urlMappingModel");

// Read base URL only from env
const BASE_URL = process.env.NEXT_APP_API_BASE_URL;

const generateShortUrl = (originalUrl, blogId) => {
  if (!originalUrl) return null;

  // Create a hash based on the original URL and blog ID
  const hash = crypto
    .createHash("md5")
    .update(`${originalUrl}${blogId}`)
    .digest("hex");

  // Take first 8 characters for a short URL
  const shortHash = hash.substring(0, 8);

  return `${BASE_URL}/api/images/${shortHash}`;
};

const createShortUrl = async (originalUrl, blogId) => {
  if (!originalUrl) return null;

  try {
    // Check if mapping already exists
    const existingMapping = await urlMappingModel.findByOriginalUrlAndBlogId(
      originalUrl,
      blogId
    );
    if (existingMapping) {
      return `${BASE_URL}/api/images/${existingMapping.short_hash}`;
    }

    // Create new mapping
    const hash = crypto
      .createHash("md5")
      .update(`${originalUrl}${blogId}`)
      .digest("hex");
    const shortHash = hash.substring(0, 8);

    await urlMappingModel.create(shortHash, originalUrl, blogId);

    return `${BASE_URL}/api/images/${shortHash}`;
  } catch (error) {
    console.error("Error creating short URL:", error);
    return originalUrl; // Fallback to original URL if short URL creation fails
  }
};

const getOriginalUrl = async (shortHash) => {
  try {
    const mapping = await urlMappingModel.findByShortHash(shortHash);
    return mapping ? mapping.original_url : null;
  } catch (error) {
    console.error("Error getting original URL:", error);
    return null;
  }
};

module.exports = {
  createShortUrl,
  getOriginalUrl,
  generateShortUrl,
};
