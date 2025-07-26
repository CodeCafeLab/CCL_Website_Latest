
"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import Link from "next/link";
import { User, Tag, Star, Eye, ThumbsUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const ArticleSkeleton = () => (
    <div className="p-6 bg-card rounded-lg shadow flex flex-col">
        <Skeleton className="h-6 w-3/4 mb-2 bg-muted" />
        <div className="flex flex-wrap gap-2 mb-2">
            <Skeleton className="h-4 w-20 bg-muted" />
            <Skeleton className="h-4 w-20 bg-muted" />
        </div>
        <Skeleton className="h-4 w-full mt-2 bg-muted" />
        <Skeleton className="h-4 w-full mt-2 bg-muted" />
        <Skeleton className="h-4 w-2/3 mt-2 mb-4 bg-muted" />
        <Skeleton className="h-10 w-full mt-auto bg-muted" />
    </div>
);

export default function HelpPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/help")
      .then(res => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Help Center / FAQs</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => <ArticleSkeleton key={index} />)}
      </div>
    </div>
  );

  if (!items.length) return <div className="text-center py-12">No help articles found.</div>;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Help Center / FAQs</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="p-6 bg-card rounded-lg shadow flex flex-col">
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <div className="mb-2 text-sm text-muted-foreground flex flex-wrap gap-2">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" /> {item.author}
              </span>
              <span className="flex items-center gap-1">
                <Tag className="h-4 w-4" /> {item.category}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" /> {item.status}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" /> {item.views}
              </span>
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" /> {item.helpful_votes}
              </span>
            </div>
            <p className="mb-2 line-clamp-3">{item.content}</p>
            {item.tags && item.tags.length > 0 && (
              <div className="mb-2">
                <span className="font-medium">Tags:</span>{" "}
                {item.tags.map((tag: string, idx: number) => (
                  <span key={idx} className="inline-block bg-primary/10 text-primary px-2 py-1 rounded mr-1 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-auto flex flex-col gap-2">
              <Link
                href={`/help/${item.id}`}
                className="inline-block mt-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 text-center font-semibold"
              >
                Read More
              </Link>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Created: {new Date(item.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
