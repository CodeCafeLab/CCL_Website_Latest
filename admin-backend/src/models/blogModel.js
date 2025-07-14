const db = require("../config/db");

exports.getAll = async () => {
  const [rows] = await db.query("SELECT * FROM blogs ORDER BY created_at DESC");
  console.log("Fetched blogs:", rows); // Add this line
  return rows;
};

exports.create = async (blog) => {
  try {
    console.log("Original blog data:", blog); // Debug log

    // Prepare the blog data with proper field mapping
    const blogData = {
      title: blog.title,
      slug: blog.slug,
      summary: blog.summary,
      content: blog.content,
      author: blog.author,
      author_id: blog.author_id,
      status: blog.status || "draft",
      category: blog.category,
      categories: blog.categories ? JSON.stringify(blog.categories) : null,
      tags: blog.tags ? JSON.stringify(blog.tags) : null,
      read_time: blog.read_time,
      views: blog.views || 0,
      thumbnail: blog.thumbnail,
      featured: blog.featured || false,
      cover_image: blog.cover_image, // expects short URL
      created_at: blog.createdDate ? new Date(blog.createdDate) : new Date(),
    };

    console.log("Prepared blog data for database:", blogData); // Debug log

    const [result] = await db.query("INSERT INTO blogs SET ?", blogData);
    console.log("Database insert result:", result); // Debug log

    return result.insertId;
  } catch (error) {
    console.error("Database error in create:", error); // Debug log
    throw error;
  }
};

exports.findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM blogs WHERE id = ?", [id]);
  return rows[0];
};

exports.findBySlug = async (slug) => {
  const [rows] = await db.query("SELECT * FROM blogs WHERE slug = ?", [slug]);
  return rows[0];
};

exports.update = async (id, blog) => {
  const blogData = {
    title: blog.title,
    slug: blog.slug,
    summary: blog.summary,
    content: blog.content,
    author: blog.author,
    author_id: blog.author_id,
    status: blog.status,
    category: blog.category,
    categories: blog.categories ? JSON.stringify(blog.categories) : null,
    tags: blog.tags ? JSON.stringify(blog.tags) : null,
    read_time: blog.read_time,
    views: blog.views,
    thumbnail: blog.thumbnail,
    featured: blog.featured,
    cover_image: blog.cover_image, // expects short URL
  };

  const [result] = await db.query("UPDATE blogs SET ? WHERE id = ?", [
    blogData,
    id,
  ]);
  return result.affectedRows > 0;
};

exports.delete = async (id) => {
  const [result] = await db.query("DELETE FROM blogs WHERE id = ?", [id]);
  return result.affectedRows > 0;
};
