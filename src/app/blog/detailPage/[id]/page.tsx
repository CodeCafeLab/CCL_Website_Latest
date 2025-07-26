
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { BlogPost, categories } from "@/types";
import { Tag as TagIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    apiClient.get(`/blogs/${id}`)
      .then((res) => {
        const blogData = res.data;
        // Ensure categories is an array of objects, not strings, if possible.
        // Based on the provided API structure, it's an array of strings.
        // We will adapt the rendering to handle this.
        setBlog(blogData);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch blog");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        Loading...
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  if (!blog) return <div className="text-center py-8">No blog found.</div>;

  // Handle categories being an array of strings
  const renderCategories = () => {
    if (!blog.categories || blog.categories.length === 0) return null;

    return (
      <div className="mb-4">
        <h4 className="mb-2">Categories :</h4>
        <div className="flex flex-wrap gap-2">
          {blog.categories.map((cat, idx) => {
            const categoryName = typeof cat === 'string' ? cat : (cat as categories).name;
            return (
              <button
                key={idx}
                className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium cursor-pointer hover:bg-primary/80"
                onClick={() => router.push(`/blog?categories=${encodeURIComponent(categoryName)}`)}
              >
                {categoryName}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto p-4 md:p-8 bg-card rounded-xl shadow-lg mt-6 mb-12">
      <div className="mb-6">
        <Link href="/blog">
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </button>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {blog.coverImage && (
          <div className="relative w-full md:w-2/5 aspect-video md:aspect-[4/5] rounded-lg overflow-hidden bg-primary flex items-center justify-center min-h-[220px] max-h-[420px] md:min-h-[320px] md:max-h-[520px]">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="p-20 transition-transform duration-500 group-hover:scale-105"
              priority
              style={{ backgroundColor: "hsl(var(--primary))" }}
              width={400}
              height={192}
            />
          </div>
        )}
        <div className="flex-1 w-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight break-words">
            {blog.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-4">
            <span>
              By{" "}
              <span className="font-semibold text-foreground">
                {blog.author}
              </span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="hidden sm:inline">•</span>
            <span>{blog.read_time} min read</span>
            <span className="hidden sm:inline">•</span>
            <span>{blog.views} views</span>
            <span className="hidden sm:inline">•</span>
            <span>
              Status:{" "}
              <span
                className={
                  blog.status === "published"
                    ? "text-green-600"
                    : "text-yellow-600"
                }
              >
                {blog.status}
              </span>
            </span>
            {blog.featured && (
              <span className="ml-2 px-2 py-1 bg-yellow-200 text-yellow-900 rounded text-xs font-semibold">
                Featured
              </span>
            )}
          </div>
          {renderCategories()}
          {blog.summary && (
            <div className="bg-primary/10 p-4 rounded-lg mb-6 text-base text-foreground">
              <p className="font-medium">{blog.summary}</p>
            </div>
          )}
          <div
            className="prose prose-base md:prose-lg max-w-none text-foreground mb-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TagIcon className="h-5 w-5 text-primary" /> Tags:
              </h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-primary/10 border border-primary/30 text-primary px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 hover:bg-primary/20 hover:text-primary-foreground cursor-pointer shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
