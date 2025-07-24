const axios = require("axios");

// Test data for blog creation
const testBlogData = {
  title: "Getting Started with React Hooks",
  slug: "getting-started-with-react-hooks",
  summary: "Learn the basics of React Hooks and how to use them effectively.",
  content:
    "React Hooks are a powerful feature that allows you to use state and other React features in functional components. In this comprehensive guide, we'll explore useState, useEffect, and other essential hooks.",
  author: "John Doe",
  author_id: "1",
  status: "published",
  category: "React",
  categories: ["React", "JavaScript"],
  tags: ["react", "hooks", "frontend"],
  read_time: "5 min",
  views: 1250,
  thumbnail:
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
  featured: true,
  coverImage:
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
  createdDate: "2024-01-15",
};

const BASE_URL = process.env.NEXT_APP_API_BASE_URL;

// First, let's test getting all blogs
async function testGetAllBlogs() {
  try {
    console.log("Testing GET /api/blogs...");
    const response = await axios.get(`${BASE_URL}/blogs`);
    console.log("Current blogs:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error getting blogs:",
      error.response?.data || error.message
    );
  }
}

// Test creating a blog (this will require authentication)
async function testCreateBlog() {
  try {
    console.log("\nTesting POST /api/blogs...");
    console.log(
      "Note: This requires authentication. You may need to login first."
    );

    // You'll need to get a token from login first
    // For now, let's just show what the request would look like
    console.log("Blog data to send:", testBlogData);

    // Uncomment the following lines after you have a valid token
    /*
    const token = 'your_jwt_token_here';
    const response = await axios.post(`${BASE_URL}/blogs`, testBlogData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Blog created successfully:', response.data);
    */
  } catch (error) {
    console.error(
      "Error creating blog:",
      error.response?.data || error.message
    );
  }
}

// Test login to get a token
async function testLogin() {
  try {
    console.log("\nTesting login to get token...");
    const loginData = {
      email: "test@example.com",
      password: "password123",
    };

    const response = await axios.post(`${BASE_URL}/auth/login`, loginData);
    console.log("Login successful, token received");
    return response.data.token;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    console.log(
      "You may need to register a user first or check your credentials"
    );
  }
}

// Main test function
async function runTests() {
  console.log("Starting API tests...\n");

  // Test getting all blogs
  await testGetAllBlogs();

  // Test login
  const token = await testLogin();

  if (token) {
    // Test creating a blog with token
    try {
      console.log("\nTesting POST /api/blogs with token...");
      const response = await axios.post(`${BASE_URL}/blogs`, testBlogData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Blog created successfully:", response.data);
    } catch (error) {
      console.error(
        "Error creating blog with token:",
        error.response?.data || error.message
      );
    }
  }

  // Test getting all blogs again to see if the new blog appears
  console.log("\nTesting GET /api/blogs again...");
  await testGetAllBlogs();
}

// Run the tests
runTests().catch(console.error);
