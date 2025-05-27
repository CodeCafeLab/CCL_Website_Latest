
"use client";

import { useState, useEffect, useRef } from 'react';
import type { FeaturedVideo } from '@/types';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Film, PlayCircle } from 'lucide-react';
import { FEATURED_VIDEOS_DATA } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function FeaturedVideosSection() {
  const [selectedVideoSrc, setSelectedVideoSrc] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const videoModalRef = useRef<HTMLVideoElement>(null);

  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const videoPreviewRefs = useRef<Map<string, HTMLVideoElement | null>>(new Map());

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

  const handleMouseEnter = (video: FeaturedVideo) => {
    setHoveredVideoId(video.id);
    // Add a slight delay to ensure the video element is in the DOM if conditional rendering is fast
    setTimeout(() => {
        const videoEl = videoPreviewRefs.current.get(video.id);
        if (videoEl) {
        videoEl.currentTime = 0;
        videoEl.play().catch(error => console.warn("Preview video autoplay prevented:", error));
        }
    }, 50);
  };

  const handleMouseLeave = (video: FeaturedVideo) => {
    setHoveredVideoId(null);
    const videoEl = videoPreviewRefs.current.get(video.id);
    if (videoEl) {
      videoEl.pause();
    }
  };

  useEffect(() => {
    if (isModalOpen && videoModalRef.current && selectedVideoSrc) {
      videoModalRef.current.load(); 
      videoModalRef.current.play().catch(error => {
        console.warn("Modal video autoplay prevented:", error);
      });
    }
  }, [isModalOpen, selectedVideoSrc]);

  if (!FEATURED_VIDEOS_DATA || FEATURED_VIDEOS_DATA.length === 0) {
    return (
      <section className="space-y-8 py-12 text-center">
        <Film className="h-12 w-12 text-muted-foreground mx-auto" />
        <p className="text-muted-foreground">No featured videos at the moment.</p>
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
            Showcasing Our Work
          </h2>
          <p className="text-muted-foreground">Quick bites & in-depth looks at what we do.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Featured Quick Bites (Horizontally Scrollable) */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center lg:text-left">Featured Quick Bites</h3>
            <div className="flex space-x-4 overflow-x-auto pb-4 -mb-4 pr-4">
              {FEATURED_VIDEOS_DATA.map((video) => (
                <div
                  key={video.id}
                  className="block flex-shrink-0 w-56 group cursor-pointer"
                  onClick={() => handleVideoClick(video.videoSrc)}
                  onMouseEnter={() => handleMouseEnter(video)}
                  onMouseLeave={() => handleMouseLeave(video)}
                >
                  <Card className="overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
                    <CardHeader className="p-0 relative">
                      <div className="aspect-[9/16] w-full relative overflow-hidden">
                        {hoveredVideoId === video.id ? (
                          <video
                            ref={(el) => videoPreviewRefs.current.set(video.id, el)}
                            src={video.videoSrc}
                            poster={video.thumbnailUrl}
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <>
                            <Image
                              src={video.thumbnailUrl}
                              alt={video.title}
                              fill
                              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 224px"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              data-ai-hint={video.dataAiHint || 'video thumbnail'}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/70 transition-colors"></div>
                            {video.duration && (
                              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded-sm">
                                {video.duration}
                              </div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <PlayCircle className="h-12 w-12 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                            </div>
                          </>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-3">
                      <h4 className="text-sm font-medium truncate group-hover:text-primary transition-colors">{video.title}</h4>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Main YouTube Embed */}
          <div className="space-y-6">
            <h3 className="font-brittany text-4xl text-primary text-center mt-4 mb-4">
              Let’s Learn the Art of Brewing with AI
            </h3>
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src={youtubeEmbedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="border-0"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
        <DialogContent
          className={cn(
            "bg-background sm:max-w-[375px] p-0 overflow-hidden aspect-[9/16] border-0 shadow-lg rounded-lg"
          )}
        >
          {selectedVideoSrc && (
            <video
              ref={videoModalRef}
              src={selectedVideoSrc}
              poster={FEATURED_VIDEOS_DATA.find(v => v.videoSrc === selectedVideoSrc)?.thumbnailUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain bg-black"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
