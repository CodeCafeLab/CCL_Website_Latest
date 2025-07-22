
import { Suspense } from "react";
import { apiClient } from "@/lib/api";
import BlogClient from "./BlogClient";
import type { BlogPost } from "@/types";

export default async function BlogPage() {
  let data: BlogPost[] = [];
  try {
    // Using apiClient for consistency and reliability
    const res = await apiClient.get("/blogs");
    const blogs = res.data; // Axios wraps response in a data object
    data = blogs.map((blog: any) => ({
      ...blog,
      imageUrl: blog.coverImage,
      date: blog.createdAt,
      excerpt: blog.summary,
    }));
  } catch (err) {
    console.error("Failed to fetch blogs for blog page:", err);
    data = [];
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogClient initialPosts={data} />
    </Suspense>
  );
}
