"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import Link from "next/link";
import { User, Tag, Star, Calendar, Download } from "lucide-react";

export default function ReportsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/reports")
      .then(res => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!items.length) return <div>No reports found.</div>;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Reports Library</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="p-6 bg-card rounded-lg shadow flex flex-col">
            {item.cover_image && (
              <img
                src={item.cover_image}
                alt={item.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
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
                <Download className="h-4 w-4" /> {item.download_count}
              </span>
            </div>
            <p className="mb-2 line-clamp-3">{item.summary}</p>
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
                href={`/reports/${item.id}`}
                className="inline-block mt-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 text-center font-semibold"
              >
                Read More
              </Link>
              {item.file_url && (
                <a
                  href={item.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/90 text-center font-semibold"
                >
                  Download
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
