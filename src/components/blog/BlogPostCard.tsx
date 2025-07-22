
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { BlogPost, categories } from "@/types";
import { ArrowRight, CalendarDays, Tag } from "lucide-react";

interface BlogPostCardProps {
  post: BlogPost;
}

const getSafeImageUrl = (imageUrl: string | undefined | null) => {
  if (
    !imageUrl ||
    typeof imageUrl !== "string" ||
    imageUrl.trim() === "" ||
    imageUrl.includes("example.com")
  ) {
    // Return a placeholder or a default image URL
    return "https://placehold.co/600x400/F8F4ED/392013?text=CodeCafe";
  }
  return imageUrl;
};

export default function BlogPostCard({ post }: BlogPostCardProps) {
    const categoryDisplay = Array.isArray(post.categories) && post.categories.length > 0
    ? (typeof post.categories[0] === 'string' ? post.categories[0] : (post.categories[0] as categories).name)
    : 'General';

  const imageSrc = getSafeImageUrl(post.coverImage || post.thumbnail);

  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
      <Link href={`/blog/detailPage/${post.id}`} className="block">
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={imageSrc}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              data-ai-hint={post.title}
              onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/600x400/F8F4ED/392013?text=CodeCafe";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-6 flex-grow">
        <div className="flex items-center text-xs text-muted-foreground mb-3 gap-4">
            <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                <Tag className="h-3 w-3" />
                {categoryDisplay}
            </span>
            <span className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </span>
        </div>
        <Link href={`/blog/detailPage/${post.id}`} className="block">
          <CardTitle className="text-xl lg:text-2xl mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {post.title}
          </CardTitle>
        </Link>
        <CardDescription className="text-sm line-clamp-3">
          {post.summary}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button
          asChild
          variant="outline"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          <Link href={`/blog/detailPage/${post.id}`}>
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

