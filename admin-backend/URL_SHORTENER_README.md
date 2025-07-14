# Image URL Shortener Feature

This feature adds short URLs for images in the blog API responses. Instead of returning long image URLs, the API now provides both the original URL and a short URL that redirects to the original image.

## Features

- **Short URLs for Images**: Automatically generates short URLs for `coverImage` and `thumbnail` fields
- **Database Storage**: URL mappings are stored in the database for persistence
- **Automatic Redirects**: Short URLs automatically redirect to the original image URLs
- **Fallback Support**: If short URL creation fails, falls back to the original URL

## Database Setup

Run the following SQL to create the required table:

```sql
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
```

## API Response Format

The blog API responses now include short URLs for images:

```json
{
  "id": 1,
  "title": "Sample Blog",
  "coverImage": "https://example.com/long-image-url.jpg",
  "coverImageShortUrl": "http://localhost:5000/api/images/a1b2c3d4",
  "thumbnail": "https://example.com/long-thumbnail-url.jpg",
  "thumbnailShortUrl": "http://localhost:5000/api/images/e5f6g7h8",
  // ... other fields
}
```

## Environment Variables

Add the following to your `.env` file:

```
BASE_URL=http://localhost:5000
```

This will be used as the base URL for short URLs. In production, set this to your actual domain.

## Usage

### Getting Blogs with Short URLs

```bash
GET /api/blogs
```

Response includes both original and short URLs for images.

### Accessing Images via Short URLs

```bash
GET /api/images/{shortHash}
```

This will redirect to the original image URL.

## Testing

Run the test script to verify the functionality:

```bash
node test-url-shortener.js
```

## Implementation Details

- **URL Generation**: Uses MD5 hash of original URL + blog ID, taking first 8 characters
- **Database Storage**: Mappings stored in `url_mappings` table
- **Caching**: Checks for existing mappings before creating new ones
- **Error Handling**: Falls back to original URL if short URL creation fails

## Files Modified/Created

- `src/utils/urlShortener.js` - URL shortening logic
- `src/models/urlMappingModel.js` - Database operations for URL mappings
- `src/routes/imageRoutes.js` - Route handler for short URLs
- `src/controllers/blogController.js` - Updated to include short URLs in responses
- `src/app.js` - Added image routes
- `setup-url-mappings.sql` - Database setup script
- `test-url-shortener.js` - Test script 