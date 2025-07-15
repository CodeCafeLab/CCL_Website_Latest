"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, User, Tag, Star, Calendar, Clock, Eye, Video } from "lucide-react";

export default function TutorialDetailPage() {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    apiClient.get(`/tutorials/${id}`)
      .then(res => setTutorial(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-[40vh]">Loading...</div>;
  if (!tutorial) return <div className="text-center py-12">Tutorial not found.</div>;

  return (
    <div className="container mx-auto py-12 max-w-2xl">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/tutorials" className="inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to Tutorials
        </Link>
      </div>
      {/* Card */}
      <div className="bg-card rounded-xl shadow-lg border border-border/60 p-6 md:p-10">
        {/* Thumbnail */}
        {tutorial.thumbnail_url && (
          <div className="w-full h-64 mb-6 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            <img
              src={tutorial.thumbnail_url}
              alt={tutorial.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        {/* Title & Meta */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <h1 className="text-3xl font-bold mb-2">{tutorial.title}</h1>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" /> {tutorial.author}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="h-4 w-4" /> {tutorial.category}
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" /> {tutorial.status}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {tutorial.duration} min
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" /> {tutorial.views}
            </span>
            <span className="flex items-center gap-1">
              <Video className="h-4 w-4" /> {tutorial.difficulty}
            </span>
          </div>
        </div>
        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground">{tutorial.description}</p>
        </div>
        {/* Content */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Content</h2>
          <div className="bg-muted p-4 rounded-lg text-sm whitespace-pre-line">{tutorial.content}</div>
        </div>
        {/* Tags */}
        {tutorial.tags && tutorial.tags.length > 0 && (
          <div className="mb-6">
            <span className="font-medium">Tags:</span>{" "}
            {tutorial.tags.map((tag: string, idx: number) => (
              <span key={idx} className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mr-1">
                {tag}
              </span>
            ))}
          </div>
        )}
        {/* Video */}
        {tutorial.video_url && (
          <div className="mb-6">
            <video
              src={tutorial.video_url}
              controls
              className="w-full rounded-lg"
              poster={tutorial.thumbnail_url}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        {/* Dates */}
        <div className="text-xs text-muted-foreground mt-4">
          <Calendar className="inline h-3 w-3 mr-1" />
          {new Date(tutorial.created_at).toLocaleDateString()}<br />
          Last Updated: {new Date(tutorial.updated_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
