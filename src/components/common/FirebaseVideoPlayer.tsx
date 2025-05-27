
"use client";

import { useState, useRef, type SyntheticEvent } from 'react';
import Image from 'next/image';
import { PlayCircle, Loader2, AlertTriangle, ImageIcon } from 'lucide-react';
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
  const [posterLoadError, setPosterLoadError] = useState(false);
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
      setIsLoading(false);
    });
  };

  const handleVideoError = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video Error:', (e.target as HTMLVideoElement).error);
    setIsLoading(false);
    setHasError(true);
    setIsPlaying(false);
  };
  
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case '16/9': return 'aspect-video';
      case '9/16': return 'aspect-[9/16]';
      case '4/3': return 'aspect-[4/3]';
      case '1/1': return 'aspect-square';
      default: return ''; 
    }
  }

  return (
    <div className={cn("relative w-full rounded-lg shadow-lg overflow-hidden bg-card", getAspectRatioClass(), className)}>
      {!isPlaying && !hasError && (
        <>
          {posterLoadError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted text-muted-foreground p-4">
              <ImageIcon className="h-12 w-12 mb-2" />
              <p className="text-sm text-center">Poster image unavailable</p>
            </div>
          ) : (
            <Image
              src={posterSrc}
              alt={title || 'Video poster'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-opacity duration-300 group-hover:opacity-80"
              priority={false}
              onError={() => {
                console.warn("Poster image failed to load for: ", posterSrc);
                setPosterLoadError(true);
              }}
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePlayClick}
              aria-label={`Play video: ${title}`}
              className="h-20 w-20 text-white hover:text-white/80 hover:bg-transparent"
            >
              <PlayCircle className="h-full w-full opacity-80 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
            </Button>
          </div>
        </>
      )}

      {isPlaying && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc} // Poster is important here too for when autoplay is blocked
          controls
          autoPlay
          playsInline
          onLoadedData={handleVideoLoadedData}
          onError={handleVideoError}
          onCanPlay={() => setIsLoading(false)}
          className="w-full h-full object-contain bg-black" // bg-black ensures no white flash if video is transparent
          aria-label={title}
        />
      )}

      {isLoading && isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-card p-4 text-center">
          <AlertTriangle className="h-12 w-12 text-destructive mb-2" />
          <p className="text-destructive-foreground">
            Video could not be loaded.
          </p>
          <p className="text-xs text-muted-foreground mt-1">Please check the video URL or try again later.</p>
        </div>
      )}
    </div>
  );
}
