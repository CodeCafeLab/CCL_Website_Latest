
"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import Link from "next/link";
import { Briefcase, User, Layers, Calendar, DollarSign, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const CaseStudySkeleton = () => (
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


export default function CaseStudiesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/case-studies")
      .then(res => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8">Case Studies</h1>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => <CaseStudySkeleton key={index} />)}
        </div>
    </div>
  );
  
  if (!items.length) return <div className="text-center py-12">No case studies found.</div>;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Case Studies</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="p-6 bg-card rounded-lg shadow flex flex-col">
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <div className="mb-2 text-sm text-muted-foreground flex flex-wrap gap-2">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" /> {item.client_name}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" /> {item.industry}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> {item.duration} mo
              </span>
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" /> ₹{item.budget}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" /> {item.status}
              </span>
            </div>
            <p className="mb-2 line-clamp-3">{item.summary}</p>
            <div className="mb-2">
              <span className="font-medium">Technologies:</span>{" "}
              {item.technologies && item.technologies.map((tech: string, idx: number) => (
                <span key={idx} className="inline-block bg-primary/10 text-primary px-2 py-1 rounded mr-1 text-xs">
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-2">
              <Link
                href={`/case-studies/${item.id}`}
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
