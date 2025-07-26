
"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";
import { Star, CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const WhyChooseUsSkeleton = () => (
    <div className="relative group p-8 bg-gradient-to-br from-card via-background to-primary/5 rounded-2xl shadow-lg flex flex-col items-center text-center border border-border">
        <div className="mb-6">
            <Skeleton className="w-20 h-20 rounded-full bg-muted" />
        </div>
        <Skeleton className="h-7 w-3/4 mb-3 bg-muted" />
        <Skeleton className="h-4 w-full bg-muted" />
        <Skeleton className="h-4 w-full mt-2 bg-muted" />
        <Skeleton className="h-4 w-2/3 mt-2 bg-muted" />
        <div className="flex flex-col items-center gap-1 mt-auto pt-4">
             <Skeleton className="h-4 w-16 bg-muted" />
             <Skeleton className="h-4 w-24 mt-1 bg-muted" />
        </div>
    </div>
);

export default function WhyChooseUsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/why-choose-us")
      .then(res => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="container mx-auto py-12">
        <h1 className="text-4xl font-extrabold mb-12 text-center tracking-tight">Why Choose Us</h1>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => <WhyChooseUsSkeleton key={index} />)}
        </div>
    </div>
  );

  if (!items.length) return <div className="text-center py-12">No reasons found.</div>;

  // Sort by order_index if you want to control the order
  items.sort((a: any, b: any) => (a.order_index ?? 0) - (b.order_index ?? 0));

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-extrabold mb-12 text-center tracking-tight">Why Choose Us</h1>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative group p-8 bg-gradient-to-br from-card via-background to-primary/5 rounded-2xl shadow-lg flex flex-col items-center text-center border border-border transition-transform hover:scale-105 hover:shadow-2xl"
          >
            {/* Status badge */}
            <span
              className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold
                ${item.status === "active"
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground"
                }`}
            >
              {item.status}
            </span>
            {/* Image or Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto shadow-inner overflow-hidden">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <CheckCircle className="h-10 w-10 text-primary" />
                )}
              </div>
            </div>
            {/* Title */}
            <h2 className="text-2xl font-bold mb-3 text-primary group-hover:text-accent transition-colors">
              {item.title}
            </h2>
            {/* Description */}
            <p className="mb-4 text-muted-foreground text-base leading-relaxed">
              {item.description}
            </p>
            {/* Created date and order */}
            <div className="flex flex-col items-center gap-1 mt-auto">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Order: {item.order_index}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Created: {new Date(item.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
