import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS_DATA, BLOG_CATEGORIES } from '@/lib/constants';
import type { BlogPost } from '@/types';
import { ArrowLeft, CalendarDays, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return BLOG_POSTS_DATA.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = BLOG_POSTS_DATA.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      images: [
        {
          url: post.imageUrl, // Make sure this is an absolute URL for OG
          width: 1200, // Example width
          height: 630, // Example height
          alt: post.title,
        },
      ],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = BLOG_POSTS_DATA.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const categoryName = BLOG_CATEGORIES.find(cat => cat.id === post.category)?.name || post.category;

  return (
    <article className="max-w-3xl mx-auto py-8 space-y-8">
      <Link href="/blog" className="inline-flex items-center text-primary hover:underline mb-8 group">
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to Blog
      </Link>

      <header className="space-y-4">
        <Badge variant="outline" className="border-primary text-primary">{categoryName}</Badge>
        <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span>{post.tags.join(', ')}</span>
            </div>
          )}
        </div>
      </header>

      <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
          data-ai-hint={post.dataAiHint}
        />
      </div>

      {/* Replace this with actual Markdown/HTML rendering if available */}
      <div className="prose dark:prose-invert prose-lg max-w-none">
        <p>{post.excerpt}</p>
        <p>This is a placeholder for the full blog post content. In a real application, this would be rendered from Markdown or a CMS.</p>
        <p>{post.content}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>

      <hr className="my-12" />

      <div className="text-center">
        <Link href="/blog" className="inline-flex items-center text-primary hover:underline group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Explore More Articles
        </Link>
      </div>
    </article>
  );
}
