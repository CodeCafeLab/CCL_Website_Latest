
"use client";

import { useState, useEffect, useRef } from "react";
import type { FeaturedVideo, YouTubeShort } from "@/types";
import Image from "next/image";
import { Card, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Film, PlayCircle, Loader2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiClient } from "@/lib/api";

export default function FeaturedVideosSection() {
  const [selectedVideoSrc, setSelectedVideoSrc] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const videoModalRef = useRef<HTMLVideoElement>(null);

  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const videoPreviewRefs = useRef<Map<string, HTMLVideoElement | null>>(
    new Map()
  );
  const [featuredVideos, setFeaturedVideos] = useState<YouTubeShort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleVideoClick = (videoSrc: string) => {
    setSelectedVideoSrc(videoSrc);
    setIsModalOpen(true);
  };

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setSelectedVideoSrc(null);
      if (videoModalRef.current) {
        videoModalRef.current.pause();
      }
    }
  };

  useEffect(() => {
    if (isModalOpen && videoModalRef.current && selectedVideoSrc) {
      videoModalRef.current.load();
      videoModalRef.current.play().catch((error) => {
        console.warn("Modal video autoplay prevented:", error);
      });
    }
  }, [isModalOpen, selectedVideoSrc]);

  // Fetch videos on mount
  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchVideos = async () => {
      try {
        const response = await apiClient.get("/quick-bites");
        const data = response.data;
        // The /quick-bites endpoint returns the array directly
        setFeaturedVideos(data || []);
      } catch (err: any) {
        setError(err.message || "Failed to load videos");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <section className="space-y-8 py-12 text-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
        <p className="text-muted-foreground">Loading featured videos...</p>
      </section>
    );
  }

  if (error || !featuredVideos || featuredVideos.length === 0) {
    return (
      <section className="space-y-8 py-12 text-center">
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
        <p className="text-destructive-foreground font-semibold">
          {error ? "Could not load videos" : "No videos available"}
        </p>
        {error && <p className="text-xs text-muted-foreground">{error}</p>}
      </section>
    );
  }

  const youtubeEmbedUrl = "https://www.youtube.com/embed/6J_DGUZ-6Lo";

  return (
    <>
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <Film className="h-10 w-10 text-primary" />
            Let's See Whats Brewing In Codecafe Lab
          </h2>
          <p className="text-muted-foreground">
            Quick bites & in-depth looks at what we do.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Featured Quick Bites (Horizontally Scrollable) */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center lg:text-left">
              Featured Quick Bites
            </h3>
            {featuredVideos.length > 0 ? (
              <div className="flex space-x-4 overflow-x-auto pb-4 -mb-4 pr-4">
                {featuredVideos.map((video) => (
                  <div
                    key={video.id}
                    className="block flex-shrink-0 w-56 group cursor-pointer"
                    onClick={() => handleVideoClick(video.youtubeUrl)}
                  >
                    <Card className="overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
                      <CardHeader className="p-0 relative">
                        {/* Changed aspect ratio to 16/9 for a shorter video card */}
                        <div className="aspect-[9/16] w-full relative">
                           <Image
                              src={video.thumbnailUrl}
                              alt={video.title}
                              fill
                              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 224px" // w-56 is 224px
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              data-ai-hint={video.dataAiHint || 'youtube short thumbnail'}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center">
                                <PlayCircle className="w-12 h-12 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No featured videos available.</p>
            )}
          </div>

          {/* Right Column: Main YouTube Embed */}
          <div className="space-y-6">
            
            <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg mt-12">
              <iframe
                width="100%"
                height="100%"
                src={youtubeEmbedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="border-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
        <DialogContent
          className={cn(
            "bg-black sm:max-w-md w-full p-0 overflow-hidden aspect-video border-0 shadow-lg rounded-lg"
          )}
        >
          {selectedVideoSrc && (
             <iframe
                ref={videoModalRef}
                src={selectedVideoSrc.replace('/shorts/', '/embed/')}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
