"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coffee, Menu, X } from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  if (!isMounted) {
    return null; 
  }

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-primary">
          <Coffee className="h-7 w-7" />
          <span>{SITE_NAME}</span>
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
          <ThemeToggle />
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
                <SheetTitle className="flex items-center gap-2 text-primary">
                  <Coffee className="h-6 w-6" />
                  {SITE_NAME}
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
