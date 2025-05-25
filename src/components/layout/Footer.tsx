
import { Coffee, Github, Linkedin, Twitter, Facebook, Briefcase, MessageSquare, Send, Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const exploreLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/ai", label: "AI Solutions" },
  ];

  const companyLinks = [
    { href: "/company", label: "About Us" },
    { href: "/career", label: "Careers" },
    { href: "/contact", label: "Contact Us" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand & Social */}
          <div className="md:col-span-1 lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block" aria-label={`${SITE_NAME} Home`}>
              <Image
                src="/codecafe_logo_dark.png"
                alt={`${SITE_NAME} Logo`}
                width={150}
                height={38}
                priority 
                data-ai-hint="company logo dark"
              />
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Brewing innovative software solutions with AI precision. Let&apos;s build something amazing together.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Meta (Facebook)" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageSquare className="h-6 w-6" />
              </Link>
              <Link href="#" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-muted-foreground hover:text-primary transition-colors">
                <Send className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Column 2: Explore Links */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-foreground">Explore</h4>
            <ul className="space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company Links */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-foreground">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} {SITE_NAME}. All rights reserved. Brewed with passion.
          </p>
        </div>
      </div>
    </footer>
  );
}
