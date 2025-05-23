"use client";

import { Button } from '@/components/ui/button';
import { BLOG_CATEGORIES } from '@/lib/constants';
import type { BlogCategory } from '@/types';

interface BlogFilterProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function BlogFilter({ selectedCategory, onSelectCategory }: BlogFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      {BLOG_CATEGORIES.map((category: BlogCategory) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? 'default' : 'outline'}
          onClick={() => onSelectCategory(category.id)}
          className={`transition-all duration-200 ${selectedCategory === category.id ? 'bg-primary text-primary-foreground' : 'border-primary/50 text-primary hover:bg-primary/10'}`}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
