const { createShortUrl, getOriginalUrl } = require('./src/utils/urlShortener');

async function testUrlShortener() {
  console.log('Testing URL Shortener...\n');
  
  const testUrl = 'https://example.com/images/long-image-url-12345.jpg';
  const blogId = 1;
  
  try {
    // Test creating short URL
    console.log('Original URL:', testUrl);
    const shortUrl = await createShortUrl(testUrl, blogId);
    console.log('Short URL:', shortUrl);
    
    // Extract short hash from the URL
    const shortHash = shortUrl.split('/').pop();
    console.log('Short Hash:', shortHash);
    
    // Test retrieving original URL
    const retrievedUrl = await getOriginalUrl(shortHash);
    console.log('Retrieved URL:', retrievedUrl);
    
    // Verify they match
    if (retrievedUrl === testUrl) {
      console.log('✅ Test passed: URLs match!');
    } else {
      console.log('❌ Test failed: URLs do not match');
    }
    
  } catch (error) {
    console.error('Test failed with error:', error);
  }
}

// Run the test
testUrlShortener(); 