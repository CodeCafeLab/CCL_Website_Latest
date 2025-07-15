"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, User, Tag, Star, Calendar, Mail } from "lucide-react";

export default function NewsletterDetailPage() {
  const { id } = useParams();
  const [newsletter, setNewsletter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    apiClient.get(`/newsletters/${id}`)
      .then(res => setNewsletter(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-[40vh]">Loading...</div>;
  if (!newsletter) return <div className="text-center py-12">Newsletter not found.</div>;

  return (
    <div className="container mx-auto py-12 max-w-2xl">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/newsletters" className="inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to Newsletters
        </Link>
      </div>
      {/* Card */}
      <div className="bg-card rounded-xl shadow-lg border border-border/60 p-6 md:p-10">
        {/* Image */}
        {newsletter.image_url && (
          <div className="w-full h-64 mb-6 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            <img
              src={newsletter.image_url}
              alt={newsletter.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        {/* Title & Meta */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <h1 className="text-3xl font-bold mb-2">{newsletter.title || "Newsletter"}</h1>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" /> {newsletter.author}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="h-4 w-4" /> {newsletter.category}
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" /> {newsletter.status}
            </span>
            {newsletter.scheduled_at && (
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" /> Scheduled: {new Date(newsletter.scheduled_at).toLocaleDateString()}
              </span>
            )}
            {newsletter.sent_at && (
              <span className="flex items-center gap-1">
                <Mail className="h-4 w-4" /> Sent: {new Date(newsletter.sent_at).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        {/* Subject Line */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Subject Line</h2>
          <p className="text-muted-foreground">{newsletter.subject_line}</p>
        </div>
        {/* Content */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Content</h2>
          <div className="bg-muted p-4 rounded-lg text-sm whitespace-pre-line">{newsletter.content}</div>
        </div>
        {/* Tags */}
        {newsletter.tags && newsletter.tags.length > 0 && (
          <div className="mb-6">
            <span className="font-medium">Tags:</span>{" "}
            {newsletter.tags.map((tag: string, idx: number) => (
              <span key={idx} className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mr-1">
                {tag}
              </span>
            ))}
          </div>
        )}
        {/* Stats */}
        <div className="mb-6 text-sm text-muted-foreground">
          <div>Recipients: {newsletter.recipient_count}</div>
          {newsletter.open_rate !== null && <div>Open Rate: {newsletter.open_rate}%</div>}
          {newsletter.click_rate !== null && <div>Click Rate: {newsletter.click_rate}%</div>}
        </div>
        {/* Dates */}
        <div className="text-xs text-muted-foreground mt-4">
          <Calendar className="inline h-3 w-3 mr-1" />
          {new Date(newsletter.created_at).toLocaleDateString()}<br />
          Last Updated: {new Date(newsletter.updated_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
