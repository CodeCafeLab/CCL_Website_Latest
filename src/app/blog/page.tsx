"use client"; // Required for useState and event handlers

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import BlogFilter from '@/components/blog/BlogFilter';
import BlogPostCard from '@/components/blog/BlogPostCard';
import { BLOG_POSTS_DATA } from '@/lib/constants';
import type { BlogPost } from '@/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

// We can't export metadata from a client component.
// If SEO for this page is critical, consider making the filtering server-side or use a child server component for the list.
// For now, this approach prioritizes client-side interactivity.

// export const metadata: Metadata = {
//   title: 'Blog',
//   description: 'Read the latest articles and insights from CodeCafe Lab on AI, software development, and technology trends.',
// };

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(BLOG_POSTS_DATA);

  useEffect(() => {
    let posts = BLOG_POSTS_DATA;
    if (selectedCategory !== 'all') {
      posts = posts.filter(post => post.category === selectedCategory);
    }
    if (searchTerm) {
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredPosts(posts);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">CodeCafe Lab Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay updated with the latest news, insights, and tutorials on AI, software development, UI/UX, and more from our team of experts.
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
        <BlogFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
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
    </div>
  );
}
