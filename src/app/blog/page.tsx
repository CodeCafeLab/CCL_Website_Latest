
import type { Metadata } from 'next';
import type { BlogPost, BlogCategory } from '@/types';
import BlogListClient from '@/components/blog/BlogListClient';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description: 'Read the latest articles and insights from CodeCafe Lab on AI, software development, and technology trends.',
};

async function getBlogs(): Promise<BlogPost[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/blogs`, {
      cache: 'no-store', // Use 'no-store' for development to see changes, or a revalidation strategy
    });

    if (!res.ok) {
      console.error("Failed to fetch blogs:", res.status, res.statusText);
      return [];
    }

    const data = await res.json();
    return data.blogs || data || []; 
  } catch (error) {
    console.error("Error fetching blogs in BlogPage:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogs();

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
