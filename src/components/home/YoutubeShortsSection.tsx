
import type { YouTubeShortsCategory } from '@/types';
import { YOUTUBE_SHORTS_DATA } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle, Youtube } from 'lucide-react';

export default function YoutubeShortsSection() {
  const categories = YOUTUBE_SHORTS_DATA;

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <Youtube className="h-10 w-10 text-primary" />
          Quick Insights: Our Shorts
        </h2>
        <p className="text-muted-foreground">Catch up with our latest tips, demos, and behind-the-scenes moments.</p>
      </div>

      {categories.map((category) => (
        <div key={category.id} className="space-y-4">
          <h3 className="text-2xl font-semibold text-primary">{category.categoryName}</h3>
          <div className="flex space-x-4 overflow-x-auto pb-4 -mb-4"> {/* Added pb-4 and -mb-4 for scrollbar visibility */}
            {category.shorts.map((short) => (
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
                        data-ai-hint={short.dataAiHint}
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
        </div>
      ))}
    </section>
  );
}
