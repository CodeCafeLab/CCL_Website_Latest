import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/types';
import { ArrowRight, CalendarDays, Tag } from 'lucide-react';
import { BLOG_CATEGORIES } from '@/lib/constants';

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const categoryName = BLOG_CATEGORIES.find(cat => cat.id === post.category)?.name || post.category;
  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
      <Link href={`/blog/${post.slug}`} className="block">
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={post.dataAiHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded">
              {categoryName}
            </span>
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-6 flex-grow">
        <Link href={`/blog/${post.slug}`} className="block">
          <CardTitle className="text-xl lg:text-2xl mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">{post.title}</CardTitle>
        </Link>
        <div className="flex items-center text-xs text-muted-foreground mb-3 gap-2">
          <CalendarDays className="h-4 w-4" />
          <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <CardDescription className="text-sm line-clamp-3">{post.excerpt}</CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Link href={`/blog/${post.slug}`}>
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
