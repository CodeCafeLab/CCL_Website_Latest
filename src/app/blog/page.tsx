import BlogClient from "./BlogClient";
import type { BlogPost } from "@/types";

export default async function BlogPage() {
  let data: BlogPost[] = [];
  try {
    const res = await fetch("http://localhost:5000/api/blogs");
    if (!res.ok) throw new Error("Failed to fetch");
    data = (await res.json()).map((blog: any) => ({
      ...blog,
      imageUrl: blog.coverImage,
      date: blog.createdAt,
      excerpt: blog.summary,
    }));
  } catch (err) {
    data = [];
  }

  return <BlogClient initialPosts={data} />;
}
