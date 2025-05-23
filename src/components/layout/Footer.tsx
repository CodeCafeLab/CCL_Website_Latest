import { Coffee, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/95 py-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2 text-primary">
            <Coffee className="h-5 w-5" />
            <span className="font-semibold">{SITE_NAME}</span>
          </div>
          <p>&copy; {currentYear} {SITE_NAME}. All rights reserved. Brewed with passion.</p>
          <div className="flex items-center gap-4">
            <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
