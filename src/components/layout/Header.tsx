
"use client";

import Link from "next/link";
import Image from "next/image"; // Import next/image
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
// import { ThemeToggle } from "@/components/ThemeToggle"; // ThemeToggle removed
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render a placeholder or null until the theme is determined client-side
    // to prevent hydration mismatch if the logo depends on the theme.
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2" aria-label="CodeCafe Lab Home">
            {/* Placeholder for logo to avoid layout shift */}
            <div style={{ width: 171, height: 43 }} />
          </div>
          <div className="flex items-center gap-4">
            {/* ThemeToggle removed */}
             <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
             </Button>
          </div>
        </div>
      </header>
    );
  }

  const closeSheet = () => setIsSheetOpen(false);

  // Since defaultTheme is "dark" and enableSystem is false, resolvedTheme will be "dark".
  // This logic will consistently pick the dark logo.
  const logoSrc = resolvedTheme === 'dark' ? "/codecafe_logo_dark.png" : "/codecafe_logo_light.png";
  const logoAlt = resolvedTheme === 'dark' ? "CodeCafe Lab Logo Dark" : "CodeCafe Lab Logo Light";


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" aria-label="CodeCafe Lab Home">
          <Image 
            src={logoSrc}
            alt={logoAlt}
            width={171} 
            height={43} 
            priority 
            data-ai-hint="company logo"
            key={logoSrc} // Add key to ensure re-render on src change
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* ThemeToggle removed */}
          {/* Mobile Navigation */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[300px] p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle className="flex items-center gap-2">
                  <Image 
                    src={logoSrc} 
                    alt={logoAlt}
                    width={140} // Slightly smaller for the sheet
                    height={35}
                    data-ai-hint="company logo"
                    key={`sheet-${logoSrc}`} // Add key
                  />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-2 p-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeSheet}
                    className={cn(
                      "block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      pathname === link.href ? "bg-accent text-accent-foreground" : "text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {link.icon && <link.icon className="h-5 w-5" />}
                      {link.label}
                    </div>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
