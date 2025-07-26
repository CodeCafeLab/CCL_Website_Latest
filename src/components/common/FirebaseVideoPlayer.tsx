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
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
}

export default function FirebaseVideoPlayer({
  videoSrc,
  posterSrc,
  title = 'Video player',
  className,
  aspectRatio = '16/9',
  autoPlay = false,
  muted = true,
  loop = true,
  controls = false,
}: FirebaseVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isLoading, setIsLoading] = useState(autoPlay);
  const [hasError, setHasError] = useState(false);
  const [posterLoadError, setPosterLoadError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
        setIsPlaying(true);
        setIsLoading(true);
        videoRef.current.play().catch(error => {
            console.warn("Manual play was prevented:", error);
            setIsPlaying(false);
            setIsLoading(false);
            setHasError(true);
        });
    }
  };

  const handleVideoLoadedData = () => {
    setIsLoading(false);
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
      <video
          ref={videoRef}
          src={videoSrc}
          poster={posterLoadError ? undefined : posterSrc}
          loop={loop}
          muted={muted}
          autoPlay={autoPlay}
          playsInline
          controls={controls}
          onLoadedData={handleVideoLoadedData}
          onError={handleVideoError}
          onCanPlay={() => setIsLoading(false)}
          className={cn("w-full h-full object-cover transition-opacity duration-300", isLoading ? 'opacity-0' : 'opacity-100')}
          aria-label={title}
        />

      {!isPlaying && !hasError && !autoPlay && (
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
              className="object-cover"
              priority={false}
              onError={() => {
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

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-card p-4 text-center">
          <AlertTriangle className="h-12 w-12 text-destructive mb-2" />
          <p className="font-semibold text-destructive-foreground">
            Video could not be loaded.
          </p>
          <p className="text-xs text-muted-foreground mt-1">Please check the video URL or try again later.</p>
        </div>
      )}
    </div>
  );
}
