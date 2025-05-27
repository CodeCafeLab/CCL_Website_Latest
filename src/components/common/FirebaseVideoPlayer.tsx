
"use client";

import { useState, useRef, type SyntheticEvent } from 'react';
import Image from 'next/image';
import { PlayCircle, Loader2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FirebaseVideoPlayerProps {
  videoSrc: string;
  posterSrc: string;
  title?: string;
  className?: string;
  aspectRatio?: '16/9' | '9/16' | '4/3' | '1/1' | 'auto';
}

export default function FirebaseVideoPlayer({
  videoSrc,
  posterSrc,
  title = 'Video player',
  className,
  aspectRatio = '16/9',
}: FirebaseVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    setIsPlaying(true);
    setIsLoading(true);
    setHasError(false);
  };

  const handleVideoLoadedData = () => {
    setIsLoading(false);
    videoRef.current?.play().catch(error => {
      console.warn("Autoplay was prevented:", error);
      // If autoplay is prevented, controls will be visible for manual play
      setIsLoading(false); // Ensure loading is false if autoplay fails but video is ready
    });
  };

  const handleVideoError = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video Error:', (e.target as HTMLVideoElement).error);
    setIsLoading(false);
    setHasError(true);
    setIsPlaying(false); // Optionally revert to poster on error
  };
  
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case '16/9': return 'aspect-video';
      case '9/16': return 'aspect-[9/16]';
      case '4/3': return 'aspect-[4/3]';
      case '1/1': return 'aspect-square';
      default: return ''; // for 'auto' or custom sizing
    }
  }

  return (
    <div className={cn("relative w-full rounded-lg shadow-lg overflow-hidden bg-card", getAspectRatioClass(), className)}>
      {!isPlaying && !hasError && (
        <>
          <Image
            src={posterSrc}
            alt={title || 'Video poster'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-opacity duration-300 hover:opacity-80"
            priority={false} // Typically posters are not LCP
            onError={() => {
              // Simple fallback if poster image fails to load
              // This will just show the play button over the background
              console.warn("Poster image failed to load.");
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePlayClick}
              aria-label={`Play video: ${title}`}
              className="h-20 w-20 text-primary-foreground hover:text-primary-foreground/80 hover:bg-transparent"
            >
              <PlayCircle className="h-full w-full text-white opacity-80 hover:opacity-100 transition-opacity" strokeWidth={1.5} />
            </Button>
          </div>
        </>
      )}

      {isPlaying && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          controls
          autoPlay
          playsInline
          onLoadedData={handleVideoLoadedData}
          onError={handleVideoError}
          onCanPlay={() => setIsLoading(false)} // Hide loader when video can start playing
          className="w-full h-full object-contain bg-black"
          aria-label={title}
        />
      )}

      {isLoading && isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-card p-4">
          <AlertTriangle className="h-12 w-12 text-destructive mb-2" />
          <p className="text-destructive-foreground text-center">
            Video could not be loaded. Please try again later.
          </p>
        </div>
      )}
    </div>
  );
}
