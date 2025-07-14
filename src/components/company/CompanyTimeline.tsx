import { TIMELINE_EVENTS } from '@/lib/constants';
import type { TimelineEvent } from '@/types';
import { CalendarDays, Milestone } from 'lucide-react';

const TimelineItem = ({ event, isLast }: { event: TimelineEvent, isLast: boolean }) => (
  <div className="relative pl-8 sm:pl-32 py-6 group">
    {/* Vertical line */}
    {!isLast && (
      <div className="absolute left-0 sm:left-12 top-0 bottom-0 w-0.5 bg-border group-hover:bg-primary transition-colors duration-300"></div>
    )}
    {/* Dot */}
    <div className="absolute left-[-0.5625rem] sm:left-[2.4375rem] top-7 w-5 h-5 rounded-full bg-background border-2 border-primary group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
      <Milestone className="w-3 h-3 text-primary" />
    </div>
    
    {/* Content */}
    <div className="relative">
      <div className="flex flex-col sm:flex-row items-start mb-1 sm:items-center">
        <time className="sm:absolute left-0 translate-y-0.5 sm:-translate-x-[calc(100%_+_2.5rem)] inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-primary bg-primary/10 rounded-full">
          {event.year}
        </time>
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{event.title}</h3>
      </div>
      <p className="text-muted-foreground">{event.description}</p>
    </div>
  </div>
);

export default function CompanyTimeline() {
  if (!TIMELINE_EVENTS || TIMELINE_EVENTS.length === 0) {
    return <p>No timeline events to display.</p>;
  }

  return (
    <div className="relative">
      <div className="absolute left-0 sm:left-12 top-0 bottom-0 w-0.5 bg-border -z-10"></div> {/* Base line */}
      {TIMELINE_EVENTS.map((event, index) => (
        <TimelineItem key={event.year + event.title} event={event} isLast={index === TIMELINE_EVENTS.length - 1} />
      ))}
    </div>
  );
}
