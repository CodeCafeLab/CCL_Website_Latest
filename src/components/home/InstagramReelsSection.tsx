
"use client";

import { useState, useEffect } from 'react';
import type { InstagramReel } from '@/types';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { PlayCircle, Instagram, Loader2, AlertTriangle } from 'lucide-react';
import { INSTAGRAM_REELS_DATA } from '@/lib/constants';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function InstagramReelsSection() {
  const displayedReels = INSTAGRAM_REELS_DATA;
  const [selectedReelEmbedUrl, setSelectedReelEmbedUrl] = useState<string | null>(null);

  const getEmbedUrl = (instagramUrl: string): string | null => {
    const match = instagramUrl.match(/\/reels?\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://www.instagram.com/reel/${match[1]}/embed`;
    }
    return null; 
  };

  const handleReelClick = (reel: InstagramReel) => {
    const embedUrl = getEmbedUrl(reel.instagramUrl);
    if (embedUrl) {
      setSelectedReelEmbedUrl(embedUrl);
    } else {
      window.open(reel.instagramUrl, '_blank');
      console.warn("Could not parse Instagram Reel URL for embedding, opening in new tab:", reel.instagramUrl);
    }
  };

  if (!displayedReels || displayedReels.length === 0) {
    return (
      <section className="space-y-8 py-12 text-center">
        <Instagram className="h-12 w-12 text-muted-foreground mx-auto" />
        <p className="text-muted-foreground">No Reels to display at the moment.</p>
      </section>
    );
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

        {displayedReels.length > 0 ? (
          <div className="flex space-x-4 overflow-x-auto pb-4 -mb-4 pr-4">
            {displayedReels.map((reel) => (
              <div key={reel.id} onClick={() => handleReelClick(reel)} className="block flex-shrink-0 w-56 group cursor-pointer">
                <Card className="overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
                  <CardHeader className="p-0 relative">
                    <div className="aspect-[9/16] w-full relative overflow-hidden"> {/* Ensure overflow-hidden is here */}
                      <Image
                        src={reel.thumbnailUrl}
                        alt={reel.title}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 224px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint={reel.dataAiHint || 'instagram reel thumbnail'}
                        // priority prop removed
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
        ) : (
          <p className="text-center text-muted-foreground">No reels available.</p>
        )}
      </section>

      <Dialog open={!!selectedReelEmbedUrl} onOpenChange={(isOpen) => { if (!isOpen) setSelectedReelEmbedUrl(null); }}>
        <DialogContent className="sm:max-w-[375px] p-0 overflow-hidden border-0 aspect-[9/16]">
          {selectedReelEmbedUrl && (
            <iframe
              src={selectedReelEmbedUrl}
              width="100%"
              height="100%"
              allowFullScreen
              title="Instagram Reel Embed"
              className="border-0 block"
            ></iframe>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
