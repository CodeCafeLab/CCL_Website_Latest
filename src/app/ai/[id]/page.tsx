
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { apiClient } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function AIFeatureDetailPage() {
  const { id } = useParams();
  const [feature, setFeature] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    apiClient.get(`/ai/${id}`)
      .then((res) => setFeature(res.data))
      .catch(() => setFeature(null));
  }, [id]);

  if (!feature) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="container mx-auto py-12 flex flex-col items-center">
      {/* Back button outside the card */}
      <div className="w-full max-w-4xl mb-6">
        <Button asChild variant="outline">
          <Link href="/ai" className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to AI Features
          </Link>
        </Button>
      </div>
      <Card className="w-full max-w-4xl shadow-xl border-primary/20 rounded-2xl">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Image section */}
            <div className="md:w-1/2 w-full h-64 md:h-auto flex-shrink-0 bg-muted rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden flex items-center justify-center">
              <img
                src={feature.image_url}
                alt={feature.title}
                className="bg-primary p-10 w-full h-full object-contain"
                style={{ minHeight: 200, maxHeight: 400 }}
              />
            </div>
            {/* Details section */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{feature.title}</h1>
              <div className="flex flex-wrap gap-3 items-center mb-4">
                <Badge variant="secondary" className="text-base">
                  {feature.category}
                </Badge>
                {feature.tags &&
                  (Array.isArray(feature.tags)
                    ? feature.tags
                    : [feature.tags]
                  ).map((tag: string, idx: number) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      {tag}
                    </Badge>
                  ))}
              </div>
              <hr className="my-4" />
              <div className="prose prose-base md:prose-lg text-foreground max-w-none mb-6">
                {feature.description}
              </div>
              {feature.link && (
                <a
                  href={feature.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-auto px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/90 text-center font-semibold transition block"
                >
                  View Demo
                </a>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
