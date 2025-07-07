
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { BlogPost } from '@/types';
import { ArrowLeft, CalendarDays, Clock, User, Tag, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { SITE_NAME } from '@/lib/constants';
import { getBlog, getAllBlogs } from '@/lib/blog-data';

type Props = {
  params: { id: string };
};

// This function generates static pages for each blog post at build time.
// It uses the centralized data fetching function.
export async function generateStaticParams() {
  const posts = await getAllBlogs();
  return posts
    .filter(post => post.status === 'published')
    .map((post) => ({
      id: post.id.toString(),
    }));
}

// This function generates dynamic metadata for the page <head>.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlog(params.id);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: new Date(post.createdDate).toISOString(),
      authors: [post.author],
      images: [
        {
          url: post.thumbnail || `https://placehold.co/1200x630.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [post.thumbnail || `https://placehold.co/1200x630.png`],
    },
  };
}

// The main component for the blog post page.
export default async function BlogPostPage({ params }: Props) {
  const post = await getBlog(params.id);

  if (!post || post.status !== 'published') {
    notFound();
  }

  const formattedDate = new Date(post.createdDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-8">
        <Link href="/blog" className="inline-flex items-center text-primary hover:underline group">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>
      </div>

      <main className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Main Content Column */}
        <article className="lg:col-span-2 space-y-8">
          <header className="space-y-4">
            <Badge variant="outline" className="border-primary text-primary font-semibold">{post.category}</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground">{post.title}</h1>
            <p className="text-lg text-muted-foreground">{post.summary}</p>
          </header>

          <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={post.thumbnail || 'https://placehold.co/1200x675.png'}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
              priority
              data-ai-hint="blog post topic"
            />
          </div>

          {/* Render post.content here */}
          <div className="prose dark:prose-invert prose-lg max-w-none prose-p:leading-relaxed prose-headings:text-foreground prose-a:text-primary hover:prose-a:underline">
            {post.content ? (
              <p>{post.content}</p>
            ) : (
              <p>This is placeholder content. The actual content would be rendered here.</p>
            )}
          </div>
        </article>

        {/* Sidebar Column */}
        <aside className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 self-start">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <User className="h-10 w-10 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">{post.author}</p>
                  <p className="text-sm text-muted-foreground">Author</p>
                </div>
              </div>
              <Separator />
              <div className="text-sm text-muted-foreground space-y-3 mt-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{post.read_time} read</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-primary" />
                  <span>{post.views.toLocaleString()} views</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {post.tags && post.tags.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </aside>
      </main>
    </div>
  );
}
