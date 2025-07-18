
"use client";

import { Button } from "@/components/ui/button";
import type { Blogcategories, categories } from "@/types";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";

interface BlogFilterProps {
  selectedcategories: string;
  onSelectcategories: (categoriesId: string) => void;
}

export default function BlogFilter({
  selectedcategories,
  onSelectcategories,
}: BlogFilterProps) {
  const [blogPosts, setBlogPosts] = useState<categories[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Using the new API route for consistency
    apiClient.get("/categories")
      .then((res) => {
        setBlogPosts(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch categories for filter:", err);
        setBlogPosts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      {/* Add the "All" button */}
      <Button
        key="all"
        variant={selectedcategories === "all" ? "default" : "outline"}
        onClick={() => onSelectcategories("all")}
        className={`transition-all duration-200 ${
          selectedcategories === "all"
            ? "bg-primary text-primary-foreground"
            : "border-primary/50 text-primary hover:bg-primary/10"
        }`}
      >
        All
      </Button>
      {/* Render the rest of the categories */}
      {blogPosts
        .filter((categories) => !!categories.id) // skip categories without id
        .map((categories) => (
          <Button
            key={categories.id ?? categories.slug}
            variant={selectedcategories === categories.id ? "default" : "outline"}
            onClick={() => onSelectcategories(categories.id!)}
            className={`transition-all duration-200 ${
              selectedcategories === categories.id
                ? "bg-primary text-primary-foreground"
                : "border-primary/50 text-primary hover:bg-primary/10"
            }`}
          >
            {categories.name}
          </Button>
        ))}
    </div>
  );
}
