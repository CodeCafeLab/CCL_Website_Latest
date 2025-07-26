"use client";
import { useState, useEffect, useMemo } from "react";
import BlogFilter from "@/components/blog/BlogFilter";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { BlogPost, categories } from "@/types";
import { useSearchParams } from "next/navigation";
import { apiClient } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

const BlogSkeleton = () => (
  <div className="flex flex-col space-y-3">
    <Skeleton className="h-[225px] w-full rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
);

export default function BlogClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categories") || "all";
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [allCategories, setAllCategories] = useState<categories[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    Promise.all([apiClient.get("/categories"), apiClient.get("/blogs")])
      .then(([categoriesRes, blogsRes]) => {
        setAllCategories(categoriesRes.data);
        const blogs = blogsRes.data.map((blog: any) => ({
          ...blog,
          categories: Array.isArray(blog.categories)
            ? blog.categories
            : blog.category
            ? [blog.category]
            : [],
        }));
        setPosts(blogs);
      })
      .catch((err) => {
        console.error("Failed to fetch blog data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredPosts = useMemo(() => {
    let newFilteredPosts = posts;

    if (selectedCategory !== "all") {
      const categoryObject = allCategories.find((c) => c.id === selectedCategory);
      if (categoryObject) {
        newFilteredPosts = newFilteredPosts.filter((post) =>
          post.categories?.some(
            (catName) =>
              typeof catName === "string" &&
              catName.toLowerCase() === categoryObject.name.toLowerCase()
          )
        );
      }
    }

    if (searchTerm) {
      newFilteredPosts = newFilteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return newFilteredPosts;
  }, [selectedCategory, searchTerm, posts, allCategories]);

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">CodeCafe Lab Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay updated with the latest news, insights, and tutorials on AI,
          software development, UI/UX, and more from our team of experts.
        </p>
      </section>

      <section>
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <BlogFilter
          categories={allCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      <section>
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg py-12">
            No blog posts found matching your criteria. Try a different search or category!
          </p>
        )}
      </section>
    </div>
  );
}
