"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import Link from "next/link";

export default function AssignmentsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/assignments")
      .then(res => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!items.length) return <div>No assignments found.</div>;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Assignments</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="p-6 bg-card rounded-lg shadow flex flex-col">
            <img
              src={item.file_url}
              alt={item.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <div className="mb-2 text-sm text-muted-foreground">
              <span className="font-medium">Category:</span> {item.category}
              {" | "}
              <span className="font-medium">Difficulty:</span> {item.difficulty}
              {" | "}
              <span className="font-medium">Estimated Time:</span> {item.estimated_time} hr
            </div>
            <p className="mb-2">{item.description}</p>
            <div className="mb-2">
              <span className="font-medium">Requirements:</span>
              <div className="text-sm whitespace-pre-line">{item.requirements}</div>
            </div>
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
              <a
                href={item.solution_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline text-sm"
              >
                View Solution
              </a>
              <Link
                href={`/assignments/${item.id}`}
                className="inline-block mt-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 text-center font-semibold"
              >
                Read More
              </Link>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Status: {item.status} <br />
              Created: {new Date(item.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
