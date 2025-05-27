
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

  return (
    <>
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <Film className="h-10 w-10 text-primary" />
            Featured Quick Bites
          </h2>
          <p className="text-muted-foreground">Short & insightful videos from our lab.</p>
        </div>

        <div className="flex space-x-4 overflow-x-auto pb-4 -mb-4 pr-4">
          {FEATURED_VIDEOS_DATA.map((video) => (
            <div
              key={video.id}
              className="block flex-shrink-0 w-56 group cursor-pointer"
              onClick={() => handleVideoClick(video.videoSrc)}
            >
              <Card className="overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
                <CardHeader className="p-0 relative">
                  <div className="aspect-[9/16] w-full relative overflow-hidden bg-black">
                    <Image
                      src={video.thumbnailUrl}
                      alt={video.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 224px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      data-ai-hint={video.dataAiHint || 'video thumbnail'}
                      poster={video.thumbnailUrl}
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
                  </div>
                </CardHeader>
                <CardContent className="p-3">
                  <h4 className="text-sm font-medium truncate group-hover:text-primary transition-colors">{video.title}</h4>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
        <DialogContent
          className={cn(
            "bg-background sm:max-w-2xl p-4 overflow-hidden aspect-video border-0 shadow-lg rounded-lg"
          )}
        >
          {selectedVideoSrc && (
            <video
              ref={videoModalRef}
              src={selectedVideoSrc}
              controls
              autoPlay
              width="100%"
              height="auto"
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
