"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, User, Tag, Star, Calendar, Download } from "lucide-react";

export default function WhitepaperDetailPage() {
  const { id } = useParams();
  const [whitepaper, setWhitepaper] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    apiClient.get(`/whitepapers/${id}`)
      .then(res => setWhitepaper(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-[40vh]">Loading...</div>;
  if (!whitepaper) return <div className="text-center py-12">Whitepaper not found.</div>;

  return (
    <div className="container mx-auto py-12 max-w-2xl">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/whitepapers" className="inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to Whitepapers
        </Link>
      </div>
      {/* Card */}
      <div className="bg-card rounded-xl shadow-lg border border-border/60 p-6 md:p-10">
        {/* Cover Image */}
        {whitepaper.cover_image && (
          <div className="w-full h-64 mb-6 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            <img
              src={whitepaper.cover_image}
              alt={whitepaper.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        {/* Title & Meta */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <h1 className="text-3xl font-bold mb-2">{whitepaper.title}</h1>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" /> {whitepaper.author}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="h-4 w-4" /> {whitepaper.category}
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" /> {whitepaper.status}
            </span>
            <span className="flex items-center gap-1">
              <Download className="h-4 w-4" /> {whitepaper.download_count}
            </span>
          </div>
        </div>
        {/* Summary */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="text-muted-foreground">{whitepaper.summary}</p>
        </div>
        {/* Content */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Content</h2>
          <div className="bg-muted p-4 rounded-lg text-sm whitespace-pre-line">{whitepaper.content}</div>
        </div>
        {/* Author Bio */}
        {whitepaper.author_bio && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Author Bio</h2>
            <div className="bg-muted p-4 rounded-lg text-sm whitespace-pre-line">{whitepaper.author_bio}</div>
          </div>
        )}
        {/* Tags */}
        {whitepaper.tags && whitepaper.tags.length > 0 && (
          <div className="mb-6">
            <span className="font-medium">Tags:</span>{" "}
            {whitepaper.tags.map((tag: string, idx: number) => (
              <span key={idx} className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mr-1">
                {tag}
              </span>
            ))}
          </div>
        )}
        {/* Download Button */}
        {whitepaper.file_url && (
          <div className="mb-6">
            <a
              href={whitepaper.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/90 font-semibold transition"
            >
              <Download className="inline h-4 w-4 mr-1" />
              Download Whitepaper
            </a>
          </div>
        )}
        {/* Dates */}
        <div className="text-xs text-muted-foreground mt-4">
          <Calendar className="inline h-3 w-3 mr-1" />
          {new Date(whitepaper.created_at).toLocaleDateString()}<br />
          Last Updated: {new Date(whitepaper.updated_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
