
"use client";

import { Button } from "@/components/ui/button";
import type { categories } from "@/types";

interface BlogFilterProps {
  categories: categories[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function BlogFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: BlogFilterProps) {

  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      <Button
        key="all"
        variant={selectedCategory === "all" ? "default" : "outline"}
        onClick={() => onSelectCategory("all")}
        className={`transition-all duration-200 ${
          selectedCategory === "all"
            ? "bg-primary text-primary-foreground"
            : "border-primary/50 text-primary hover:bg-primary/10"
        }`}
      >
        All
      </Button>
      {categories
        .filter((category) => !!category.id) // skip categories without id
        .map((category) => (
          <Button
            key={category.id ?? category.slug}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onSelectCategory(category.id!)}
            className={`transition-all duration-200 ${
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "border-primary/50 text-primary hover:bg-primary/10"
            }`}
          >
            {category.name}
          </Button>
        ))}
    </div>
  );
}
