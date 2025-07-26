
"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import Link from "next/link";
import { User, Tag, Star, Calendar, Clock, Video, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const WebinarSkeleton = () => (
    <div className="p-6 bg-card rounded-lg shadow flex flex-col">
        <Skeleton className="w-full h-48 rounded mb-4 bg-muted" />
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


export default function WebinarsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/webinars")
      .then(res => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
     <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">Webinars & Events</h1>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => <WebinarSkeleton key={index} />)}
        </div>
    </div>
  );
  if (!items.length) return <div className="text-center py-12">No webinars found.</div>;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Webinars & Events</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="p-6 bg-card rounded-lg shadow flex flex-col">
            {item.thumbnail_url && (
              <img
                src={item.thumbnail_url}
                alt={item.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <div className="mb-2 text-sm text-muted-foreground flex flex-wrap gap-2">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" /> {item.speaker}
              </span>
              <span className="flex items-center gap-1">
                <Tag className="h-4 w-4" /> {item.category}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" /> {item.status}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> {new Date(item.date_time).toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {item.duration} hr
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" /> {item.registered_participants}/{item.max_participants}
              </span>
            </div>
            <p className="mb-2 line-clamp-3">{item.description}</p>
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
                href={`/webinars/${item.id}`}
                className="inline-block mt-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 text-center font-semibold"
              >
                Read More
              </Link>
              {item.recording_url && (
                <a
                  href={item.recording_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/90 text-center font-semibold"
                >
                  Watch Recording
                </a>
              )}
              {item.registration_url && (
                <a
                  href={item.registration_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 bg-primary/80 text-primary-foreground rounded hover:bg-primary/90 text-center font-semibold"
                >
                  Register
                </a>
              )}
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              <Calendar className="inline h-3 w-3 mr-1" />
              {new Date(item.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
