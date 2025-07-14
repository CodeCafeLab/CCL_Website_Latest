"use client";
import { useState, useEffect } from "react";
import BlogFilter from "@/components/blog/BlogFilter";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { BlogPost } from "@/types";
import type { categories } from "@/types";
import { useSearchParams } from "next/navigation";

interface BlogClientProps {
  initialPosts: BlogPost[];
}

export default function BlogClient({ initialPosts }: BlogClientProps) {
  const searchParams = useSearchParams();
  const initialcategories = searchParams.get("categories") || "all";
  const [selectedcategories, setSelectedcategories] = useState<string>(initialcategories);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(initialPosts);

  useEffect(() => {
    let posts = initialPosts;
    if (selectedcategories !== "all") {
      posts = posts.filter(post =>
        post.categories?.some(cat => cat.id === selectedcategories)
      );
    }
    if (searchTerm) {
      posts = posts.filter(
        post =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredPosts(posts);
  }, [selectedcategories, searchTerm, initialPosts]);

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
          selectedcategories={selectedcategories}
          onSelectcategories={setSelectedcategories}
        />
      </section>
      <section>
        {filteredPosts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg py-12">
            No blog posts found matching your criteria. Try a different search
            or categories!
          </p>
        )}
      </section>
    </div>
  );
}
