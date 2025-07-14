
"use client";

import type { OpenPosition } from '@/types';
import { useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ApplicationFormSheet from './ApplicationFormSheet'; // Import the new sheet component

interface OpenPositionsSliderProps {
  positions: OpenPosition[];
}

export default function OpenPositionsSlider({ positions }: OpenPositionsSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isFormSheetOpen, setIsFormSheetOpen] = useState(false);
  const [selectedPositionTitle, setSelectedPositionTitle] = useState<string | null>(null);

  const scrollAmount = 320;

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleApplyNowClick = (title: string) => {
    setSelectedPositionTitle(title);
    setIsFormSheetOpen(true);
  };

  if (!positions || positions.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        We currently don't have any open positions, but we're always looking for talent. Feel free to send us your resume!
      </p>
    );
  }

  return (
    <>
      <div className="relative group">
        <Button
          variant="outline"
          size="icon"
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/80 hover:bg-background rounded-full shadow-md hidden md:flex" // Hide on small screens
          onClick={handleScrollLeft}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-6 py-4 scrollbar-hide"
        >
          {positions.map((position) => (
            <div key={position.id} className="flex-shrink-0 w-80">
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">{position.title}</CardTitle>
                  <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-1">
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {position.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {position.type}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {position.description || `We are looking for a talented ${position.title} to join our dynamic team. You will be working on exciting projects helping us push the boundaries of technology and innovation...`}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleApplyNowClick(position.title)}>
                    Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/80 hover:bg-background rounded-full shadow-md hidden md:flex" // Hide on small screens
          onClick={handleScrollRight}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
        <style jsx global>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}</style>
      </div>
      {selectedPositionTitle && (
        <ApplicationFormSheet
          isOpen={isFormSheetOpen}
          onOpenChange={setIsFormSheetOpen}
          positionTitle={selectedPositionTitle}
        />
      )}
    </>
  );
}
