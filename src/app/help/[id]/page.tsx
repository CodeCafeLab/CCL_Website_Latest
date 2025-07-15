"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, User, Tag, Star, Eye, ThumbsUp } from "lucide-react";

export default function HelpDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    apiClient.get(`/help/${id}`)
      .then(res => setArticle(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-[40vh]">Loading...</div>;
  if (!article) return <div className="text-center py-12">Help article not found.</div>;

  return (
    <div className="container mx-auto py-12 max-w-2xl">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/help" className="inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to Help Center
        </Link>
      </div>
      {/* Card */}
      <div className="bg-card rounded-xl shadow-lg border border-border/60 p-6 md:p-10">
        {/* Title & Meta */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" /> {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="h-4 w-4" /> {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" /> {article.status}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" /> {article.views}
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" /> {article.helpful_votes}
            </span>
          </div>
        </div>
        {/* Content */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Content</h2>
          <div className="bg-muted p-4 rounded-lg text-sm whitespace-pre-line">{article.content}</div>
        </div>
        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mb-6">
            <span className="font-medium">Tags:</span>{" "}
            {article.tags.map((tag: string, idx: number) => (
              <span key={idx} className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mr-1">
                {tag}
              </span>
            ))}
          </div>
        )}
        {/* Dates */}
        <div className="text-xs text-muted-foreground mt-4">
          Created: {new Date(article.created_at).toLocaleDateString()}<br />
          Last Updated: {new Date(article.updated_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
