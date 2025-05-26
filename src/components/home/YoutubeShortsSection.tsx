
"use client";

import { useState, useEffect }from 'react';
import type { YouTubeShort } from '@/types';
// import { YOUTUBE_SHORTS_DATA } from '@/lib/constants'; // Removed static data
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Youtube, Loader2, AlertTriangle } from 'lucide-react';

export default function YoutubeShortsSection() {
  const [displayedShorts, setDisplayedShorts] = useState<YouTubeShort[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShorts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/youtube-shorts');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to fetch shorts: ${response.statusText}`);
        }
        const data = await response.json();
        setDisplayedShorts(data.shorts || []);
      } catch (err: any) {
        console.error("Failed to fetch YouTube shorts:", err);
        setError(err.message || "An unexpected error occurred.");
        setDisplayedShorts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShorts();
  }, []);


  if (isLoading) {
    return (
      <section className="space-y-8 py-12 text-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
        <p className="text-muted-foreground">Loading latest shorts...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-8 py-12 text-center">
         <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
        <p className="text-destructive-foreground font-semibold">Failed to load shorts</p>
        <p className="text-sm text-muted-foreground">{error}</p>
        <p className="text-xs text-muted-foreground mt-2">Please ensure the YouTube API key and Channel ID are correctly configured in your environment variables.</p>
      </section>
    );
  }

  if (!displayedShorts || displayedShorts.length === 0) {
    return (
        <section className="space-y-8 py-12 text-center">
            <Youtube className="h-12 w-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">No shorts to display at the moment.</p>
            <p className="text-xs text-muted-foreground mt-2">This could be due to no recent shorts found or API configuration issues.</p>
        </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <Youtube className="h-10 w-10 text-primary" />
          Hey ! See, Whats Cooking in our Lab
        </h2>
        <p className="text-muted-foreground">Catch up with our latest tips, demos, and behind-the-scenes moments.</p>
      </div>

      {/* Category chips removed as we are fetching a flat list for now */}
      {/* <div className="flex flex-wrap gap-2 mb-6 justify-center"> ... </div> */}

      {displayedShorts.length > 0 ? (
        <div className="flex space-x-4 overflow-x-auto pb-4 -mb-4 pr-4"> {/* Added pr-4 for scrollbar visibility on far right */}
          {displayedShorts.map((short) => (
            <Link key={short.id} href={short.youtubeUrl} target="_blank" rel="noopener noreferrer" className="block flex-shrink-0 w-56 group">
              <Card className="overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
                <CardHeader className="p-0 relative">
                  <div className="aspect-[9/16] w-full relative">
                    <Image
                      src={short.thumbnailUrl}
                      alt={short.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 224px" // w-56 is 224px
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={short.dataAiHint || 'youtube short thumbnail'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent group-hover:from-black/70 transition-colors"></div>
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded-sm">
                      {short.duration}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-3">
                  <h4 className="text-sm font-medium truncate group-hover:text-primary transition-colors">{short.title}</h4>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
         <p className="text-center text-muted-foreground">No shorts available for this category.</p>
      )}
    </section>
  );
}
