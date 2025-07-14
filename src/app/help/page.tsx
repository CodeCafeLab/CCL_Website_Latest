"use client";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";

export default function HelpPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/help")
      .then(res => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!items.length) return <div>No help articles found.</div>;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Help Center / FAQs</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <div key={item.id || idx} className="p-6 bg-card rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{item.question || item.title}</h2>
            <p className="text-muted-foreground">{item.answer || item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
