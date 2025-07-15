"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, User, Tag, Star, Calendar, Clock, Video, Users } from "lucide-react";

export default function WebinarDetailPage() {
  const { id } = useParams();
  const [webinar, setWebinar] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    apiClient.get(`/webinars/${id}`)
      .then(res => setWebinar(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-[40vh]">Loading...</div>;
  if (!webinar) return <div className="text-center py-12">Webinar not found.</div>;

  return (
    <div className="container mx-auto py-12 max-w-2xl">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/webinars" className="inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Back to Webinars
        </Link>
      </div>
      {/* Card */}
      <div className="bg-card rounded-xl shadow-lg border border-border/60 p-6 md:p-10">
        {/* Thumbnail */}
        {webinar.thumbnail_url && (
          <div className="w-full h-64 mb-6 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            <img
              src={webinar.thumbnail_url}
              alt={webinar.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        {/* Title & Meta */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
          <h1 className="text-3xl font-bold mb-2">{webinar.title}</h1>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" /> {webinar.speaker}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="h-4 w-4" /> {webinar.category}
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" /> {webinar.status}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" /> {new Date(webinar.date_time).toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {webinar.duration} hr
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" /> {webinar.registered_participants}/{webinar.max_participants}
            </span>
          </div>
        </div>
        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-muted-foreground">{webinar.description}</p>
        </div>
        {/* Speaker Bio */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Speaker Bio</h2>
          <div className="bg-muted p-4 rounded-lg text-sm whitespace-pre-line">{webinar.speaker_bio}</div>
        </div>
        {/* Tags */}
        {webinar.tags && webinar.tags.length > 0 && (
          <div className="mb-6">
            <span className="font-medium">Tags:</span>{" "}
            {webinar.tags.map((tag: string, idx: number) => (
              <span key={idx} className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mr-1">
                {tag}
              </span>
            ))}
          </div>
        )}
        {/* Recording */}
        {webinar.recording_url && (
          <div className="mb-6">
            <video
              src={webinar.recording_url}
              controls
              className="w-full rounded-lg"
              poster={webinar.thumbnail_url}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        {/* Registration */}
        {webinar.registration_url && (
          <div className="mb-6">
            <a
              href={webinar.registration_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-primary/80 text-primary-foreground rounded hover:bg-primary/90 font-semibold transition"
            >
              Register Now
            </a>
          </div>
        )}
        {/* Dates */}
        <div className="text-xs text-muted-foreground mt-4">
          <Calendar className="inline h-3 w-3 mr-1" />
          {new Date(webinar.created_at).toLocaleDateString()}<br />
          Last Updated: {new Date(webinar.updated_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
