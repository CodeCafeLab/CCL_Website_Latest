
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Coffee, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist or has been moved.',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-center px-4">
      <div className="mb-8">
        <AlertTriangle className="h-24 w-24 text-destructive animate-pulse" />
      </div>
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Oops! Page Not Found.</h2>
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        It seems the page you were looking for is not here. Maybe it was moved, or you mistyped the URL. Don&apos;t worry, let&apos;s get you back on track.
      </p>
      <div className="flex items-center space-x-4">
        <Button asChild size="lg">
          <Link href="/">
            <Coffee className="mr-2 h-5 w-5" /> Go Back to Homepage
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/contact">Contact Support</Link>
        </Button>
      </div>
       <div className="mt-12">
        <svg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" className="opacity-80 drop-shadow-lg">
          <path d="M50 100C50 72.3858 72.3858 50 100 50C127.614 50 150 72.3858 150 100V120H50V100Z" className="fill-card stroke-border" strokeWidth="2"/>
          <g>
              <circle cx="80" cy="80" r="10" className="fill-primary" />
              <circle cx="120" cy="80" r="10" className="fill-primary" />
              <circle cx="80" cy="80" r="13" className="fill-primary/20 animate-pulse" />
              <circle cx="120" cy="80" r="13" className="fill-primary/20 animate-pulse" style={{ animationDelay: '0.3s' }} />
          </g>
          <path d="M85 105C85 107.761 87.2386 110 90 110H110C112.761 110 115 107.761 115 105C115 102.239 112.761 100 110 100H90C87.2386 100 85 102.239 85 105Z" className="fill-muted-foreground" />
          <g className="origin-bottom animate-bounce">
              <rect x="95" y="30" width="10" height="20" rx="5" className="fill-accent" />
              <path d="M90 20L100 10L110 20" stroke="hsl(var(--accent))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}
