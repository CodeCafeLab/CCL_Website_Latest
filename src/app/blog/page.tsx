
import type { Metadata } from 'next';
import type { BlogPost, BlogCategory } from '@/types';
import BlogListClient from '@/components/blog/BlogListClient';
import { SITE_NAME } from '@/lib/constants';
import { getAllBlogs } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description: 'Read the latest articles and insights from CodeCafe Lab on AI, software development, and technology trends.',
};

export default async function BlogPage() {
  // Directly call the centralized data fetching function
  const posts = await getAllBlogs();

  const categories: BlogCategory[] = [
    { id: 'all', name: 'All' },
    ...Array.from(new Set(posts.map(p => p.category.trim())))
      .filter(Boolean) // Remove any empty categories
      .sort()
      .map(cat => ({ id: cat.toLowerCase().replace(/\s+/g, '-'), name: cat }))
  ];

  const publishedPosts = posts.filter(p => p.status === 'published');

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">CodeCafe Lab Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay updated with the latest news, insights, and tutorials on AI, software development, UI/UX, and more from our team of experts.
        </p>
      </section>

      <BlogListClient posts={publishedPosts} categories={categories} />
    </div>
  );
}
