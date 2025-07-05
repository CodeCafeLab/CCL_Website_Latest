
"use client";

import { useState, useEffect, useRef } from 'react';
import type { FeaturedVideo } from '@/types'; 
import Image from 'next/image';
import Script from 'next/script';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Instagram, PlayCircle } from 'lucide-react';
import { INSTAGRAM_REELS_DATA } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function InstagramReelsSection() {
  const [selectedReelEmbedUrl, setSelectedReelEmbedUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getEmbedUrl = (instagramUrl: string): string | null => {
    // This regex is simplified and might need adjustment for different URL formats
    const match = instagramUrl.match(/\/reels?\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://www.instagram.com/reel/${match[1]}/embed/captioned`;
    }
    return null;
  };
  
  const handleReelClick = (reel: FeaturedVideo) => {
    if (!reel.instagramUrl) return;

    const embedUrl = getEmbedUrl(reel.instagramUrl);
    if (embedUrl) {
      setSelectedReelEmbedUrl(embedUrl);
      setIsModalOpen(true);
    } else {
      // Fallback to opening in a new tab if URL parsing fails
      window.open(reel.instagramUrl, '_blank');
      console.warn("Could not parse Instagram Reel URL for iframe embedding, opening in new tab:", reel.instagramUrl);
    }
  };

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setSelectedReelEmbedUrl(null);
    }
  };
  
  if (!INSTAGRAM_REELS_DATA || INSTAGRAM_REELS_DATA.length === 0) {
    return null; // Don't render the section if there's no data
  }

  return (
    <>
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <Instagram className="h-10 w-10 text-primary" />
            Hey ! See, Whats brewing in CodeCafe Lab
          </h2>
          <p className="text-muted-foreground">Catch up with our latest tips, demos, and behind-the-scenes moments.</p>
        </div>

        <div className="flex space-x-4 overflow-x-auto pb-4 -mb-4 pr-4">
          {INSTAGRAM_REELS_DATA.map((reel) => (
            <div key={reel.id} onClick={() => handleReelClick(reel)} className="block flex-shrink-0 w-56 group cursor-pointer">
              <Card className="overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
                <CardHeader className="p-0 relative">
                  <div className="aspect-[9/16] w-full relative overflow-hidden">
                    <Image
                      src={reel.thumbnailUrl}
                      alt={reel.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 224px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={reel.dataAiHint || 'instagram reel'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/70 transition-colors"></div>
                    {reel.duration && (
                      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded-sm">
                        {reel.duration}
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-3">
                  <h4 className="text-sm font-medium truncate group-hover:text-primary transition-colors">{reel.title}</h4>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={handleModalOpenChange}>
        <DialogContent
            className="bg-background p-0 border-0 shadow-lg rounded-lg w-auto sm:max-w-sm"
        >
          {selectedReelEmbedUrl && (
             <div className="aspect-[9/16] w-full">
                <iframe
                src={selectedReelEmbedUrl}
                width="100%"
                height="100%"
                allowFullScreen
                title="Instagram Reel Embed"
                className="border-0 block rounded-lg"
                ></iframe>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
