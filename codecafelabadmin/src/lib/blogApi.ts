import apiClient from "./axios";

export const getBlogs = () => apiClient.get("http://localhost:5000/api/blogs");
export const getBlog = (id: string) =>
  apiClient.get(`http://localhost:5000/api/blogs/${id}`);
export const getBlogBySlug = (slug: string) =>
  apiClient.get(`http://localhost:5000/api/blogs/slug/${slug}`);
export const getBlogsByCategory = (category: string) =>
  apiClient.get(`http://localhost:5000/api/blogs?category=${category}`);
