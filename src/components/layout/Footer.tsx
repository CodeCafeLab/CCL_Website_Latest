
import { Coffee, Github, Linkedin, Twitter, Facebook, Briefcase, MessageSquare, Send, Instagram, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const usefulLinks = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-and-conditions", label: "Terms & Conditions" },
    { href: "/shipping-and-delivery", label: "Shipping and Delivery" },
    { href: "/refund-policy", label: "Refund Policy" },
  ];

  const resourceLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/career", label: "Career" },
    { href: "/consultancy", label: "Consultancy" },
    { href: "#", label: "Download Brochure", icon: Download },
  ];

  const socialLinks = [
    { href: "https://www.linkedin.com/in/codecafe-lab-890038256/", label: "LinkedIn", icon: Linkedin },
    { href: "https://twitter.com/CodecafeL8514", label: "X (Twitter)", icon: Twitter },
    { href: "https://www.facebook.com/p/CodeCafe-Lab-100084294096806/", label: "Meta (Facebook)", icon: Facebook },
    { href: "https://www.instagram.com/codecafelab4u/", label: "Instagram", icon: Instagram },
    { href: "#", label: "WhatsApp", icon: MessageSquare },
    { href: "#", label: "Telegram", icon: Send },
    { href: "https://github.com/settings/profile", label: "GitHub", icon: Github },
  ]

  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Column 1: Brand & Social */}
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="inline-block mb-2" aria-label={`${SITE_NAME} Home`}>
              <Image
                src="/codecafe_logo_dark.png"
                width={120}
                height={40}
                style={{ height: "auto" }}
                alt={`${SITE_NAME} Logo`}
                priority 
                data-ai-hint="company logo dark"
              />
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Brewing innovative software solutions with AI precision. Let&apos;s build something amazing together.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((social) => (
                <Link key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="text-muted-foreground hover:text-primary transition-colors">
                  <social.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-foreground">Useful Links</h4>
            <ul className="space-y-2">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    {link.icon && <link.icon className="h-4 w-4" />}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Subscribe Us & Talk to Us */}
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-semibold text-foreground mb-3">Subscribe Us</h4>
              <form className="flex flex-col sm:flex-row gap-2 items-start">
                <Input type="email" placeholder="Your email" className="flex-grow bg-muted/30 border-border placeholder:text-muted-foreground/70" />
                <Button type="submit" variant="outline" className="shrink-0">Subscribe</Button>
              </form>
            </div>
            <div>
              {/* Removed "Talk to Us" h4 title */}
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
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
