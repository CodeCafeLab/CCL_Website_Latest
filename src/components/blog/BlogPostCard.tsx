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
import type { BlogPost } from "@/types";
import { ArrowRight, CalendarDays, Tag } from "lucide-react";

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const categoriesNames = Array.isArray(post.categories)
    ? post.categories.map((cat) => cat.name).join(", ")
    : typeof post.categories === "string"
    ? post.categories
    : "";

  console.log(categoriesNames, "categoriesNamescategoriesNames");
  const imageSrc = post.thumbnail || post.coverImage || null;
  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
      <Link href={`/blog/detailPage/${post.id}`} className="block">
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden">
            {imageSrc && (
              <Image
                src={imageSrc}
                alt={post.title}
                fill
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className=" transition-transform duration-500 group-hover:scale-105"
                data-ai-hint={post.title}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-6 flex-grow">
        <Link href={`/blog/detailPage/${post.id}`} className="block">
          <CardTitle className="text-xl lg:text-2xl mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {post.title}
          </CardTitle>
        </Link>
        <div className="flex items-center text-xs text-muted-foreground mb-3 gap-2">
          <CalendarDays className="h-4 w-4" />
          <span>
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
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
