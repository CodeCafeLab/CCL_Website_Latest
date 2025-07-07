
"use client";

import { useState, useEffect } from 'react';
import type { BlogPost, BlogCategory } from '@/types';
import BlogFilter from '@/components/blog/BlogFilter';
import BlogPostCard from '@/components/blog/BlogPostCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface BlogListProps {
  posts: BlogPost[];
  categories: BlogCategory[];
}

export default function BlogListClient({ posts, categories }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);

  useEffect(() => {
    let results = posts;

    // Filter by category
    if (selectedCategory !== 'all') {
      const categoryName = categories.find(c => c.id === selectedCategory)?.name;
      if (categoryName) {
        results = results.filter(post => post.category === categoryName);
      }
    }

    // Filter by search term
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      results = results.filter(post => 
        post.title.toLowerCase().includes(lowercasedTerm) ||
        post.summary.toLowerCase().includes(lowercasedTerm)
      );
    }
    setFilteredPosts(results);
  }, [selectedCategory, searchTerm, posts, categories]);

  return (
    <>
      <section>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <div className="relative max-w-md w-full mx-auto sm:mx-0">
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
        <BlogFilter categories={categories} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
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
            No blog posts found matching your criteria. Try a different search or category!
          </p>
        )}
      </section>
    </>
  );
}
