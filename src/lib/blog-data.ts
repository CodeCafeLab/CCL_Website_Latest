import type { BlogPost } from '@/types';

// The backend API URL is loaded from environment variables.
// See the .env file for configuration.
const API_BASE_URL = process.env.BACKEND_API_URL;

/**
 * Fetches all blog posts from the backend.
 * Caches the data for 60 seconds.
 */
export async function getAllBlogs(): Promise<BlogPost[]> {
  if (!API_BASE_URL) {
    console.error("BACKEND_API_URL is not defined in .env file. Cannot fetch blogs.");
    return [];
  }
  try {
    const res = await fetch(`${API_BASE_URL}/blogs`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Failed to fetch blogs from backend:", res.status, res.statusText);
      return [];
    }
    const data = await res.json();
    // The backend might wrap the response in a "blogs" key or return an array directly
    return data.blogs || data || [];
  } catch (error) {
    console.error("Error in getAllBlogs:", error);
    // Return empty array to prevent breaking server-side rendering
    return [];
  }
}

/**
 * Fetches a single blog post by its ID from the backend.
 * Caches the data for 60 seconds.
 * @param id The ID of the blog post to fetch.
 */
export async function getBlog(id: string): Promise<BlogPost | null> {
  if (!API_BASE_URL) {
    console.error("BACKEND_API_URL is not defined in .env file. Cannot fetch blog.");
    return null;
  }
  try {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      console.error(`Failed to fetch blog post ${id} from backend:`, res.status, res.statusText);
      return null;
    }
    const data = await res.json();
    // The backend might wrap the response in a "blog" key or return the object directly
    return data.blog || data;
  } catch (error) {
    console.error(`Error in getBlog for id ${id}:`, error);
    return null;
  }
}
