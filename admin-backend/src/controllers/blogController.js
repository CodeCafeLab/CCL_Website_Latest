const blogModel = require("../models/blogModel");
const { createShortUrl } = require("../utils/urlShortener");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // or configure as needed

exports.getAllBlogs = async (req, res) => {
  try {
    const { category } = req.query;
    let blogs = await blogModel.getAll();
    if (category) {
      blogs = blogs.filter(blog =>
        blog.categories && JSON.parse(blog.categories).includes(category)
      );
    }
    // Parse JSON fields back to arrays and map cover_image to coverImage
    const formattedBlogs = await Promise.all(
      blogs.map(async (blog) => ({
        ...blog,
        categories: blog.categories ? JSON.parse(blog.categories) : [],
        tags: blog.tags ? JSON.parse(blog.tags) : [],
        coverImage: blog.cover_image, // always short URL
        createdAt: blog.created_at,
        // Remove coverImageShortUrl
        thumbnailShortUrl: await createShortUrl(blog.thumbnail, blog.id),
      }))
    );
    res.json(formattedBlogs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      summary,
      content,
      author,
      author_id,
      status,
      category,
      categories,
      tags,
      read_time,
      views,
      thumbnail,
      featured,
      cover_image, // original image URL from frontend
      createdDate,
    } = req.body;

    if (!title || !slug || !summary || !content) {
      return res.status(400).json({ message: "Title, slug, summary, and content are required fields." });
    }

    // Generate short URL for cover image
    const shortUrl = await createShortUrl(cover_image, null); // blogId is null for now

    // Prepare blog data for DB
    const blogData = {
      ...req.body,
      cover_image: shortUrl, // store short URL in DB
      createdDate,
    };

    const blogId = await blogModel.create(blogData);
    const createdBlog = await blogModel.findById(blogId);

    // Update the short URL with blogId if needed
    const finalShortUrl = await createShortUrl(cover_image, blogId);
    if (finalShortUrl !== shortUrl) {
      await blogModel.update(blogId, { ...createdBlog, cover_image: finalShortUrl });
    }
    const updatedBlog = await blogModel.findById(blogId);

    res.status(201).json({
      message: "Blog created successfully",
      blog: {
        ...updatedBlog,
        categories: updatedBlog.categories ? JSON.parse(updatedBlog.categories) : [],
        tags: updatedBlog.tags ? JSON.parse(updatedBlog.tags) : [],
        coverImage: updatedBlog.cover_image, // always return short URL
        createdAt: updatedBlog.created_at,
        thumbnailShortUrl: await createShortUrl(updatedBlog.thumbnail, updatedBlog.id),
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({
      ...blog,
      categories: blog.categories ? JSON.parse(blog.categories) : [],
      tags: blog.tags ? JSON.parse(blog.tags) : [],
      coverImage: blog.cover_image, // always short URL
      createdAt: blog.created_at,
      thumbnailShortUrl: await createShortUrl(blog.thumbnail, blog.id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      summary,
      content,
      author,
      author_id,
      status,
      category,
      categories,
      tags,
      read_time,
      views,
      thumbnail,
      featured,
      cover_image, // original image URL from frontend
    } = req.body;

    if (!title || !slug || !summary || !content) {
      return res.status(400).json({ message: "Title, slug, summary, and content are required fields." });
    }

    // Generate short URL for cover image
    const shortUrl = await createShortUrl(cover_image, id);
    const blogData = {
      ...req.body,
      cover_image: shortUrl, // store short URL in DB
    };

    const success = await blogModel.update(id, blogData);
    if (!success) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const updatedBlog = await blogModel.findById(id);
    res.json({
      message: "Blog updated successfully",
      blog: {
        ...updatedBlog,
        categories: updatedBlog.categories ? JSON.parse(updatedBlog.categories) : [],
        tags: updatedBlog.tags ? JSON.parse(updatedBlog.tags) : [],
        coverImage: updatedBlog.cover_image, // always short URL
        createdAt: updatedBlog.created_at,
        thumbnailShortUrl: await createShortUrl(updatedBlog.thumbnail, updatedBlog.id),
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await blogModel.delete(id);

    if (!success) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await blogModel.findBySlug(slug);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({
      ...blog,
      categories: blog.categories ? JSON.parse(blog.categories) : [],
      tags: blog.tags ? JSON.parse(blog.tags) : [],
      coverImage: blog.cover_image,
      createdAt: blog.created_at,
      thumbnailShortUrl: await createShortUrl(blog.thumbnail, blog.id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
