"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { BlogPost } from "@/types";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch blog");
        }
        return res.json();
      })
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!blog) return <div>Blog not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <article className="prose prose-lg max-w-none">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 mb-4">
            <span>By {blog.author}</span>
            <span>•</span>
            <span>
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>•</span>
            <span>{blog.read_time} min read</span>
          </div>
          {blog.categories && blog.categories.length > 0 && (
            <div className="flex gap-2 mb-4">
              {blog.categories.map((categories, index) => (
                <span
                  key={index}
                  className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm"
                >
                  {categories.name}
                </span>
              ))}
            </div>
          )}
        </header>

        {blog.coverImage && (
          <div className="mb-8">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        {blog.summary && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-lg font-medium text-gray-700">{blog.summary}</p>
          </div>
        )}

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-semibold mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
