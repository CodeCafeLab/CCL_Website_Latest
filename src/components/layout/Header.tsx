
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { NAV_LINKS, SERVICES_DATA } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import type { Service } from '@/types';

export default function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const logoSrc = "/codecafe_logo_dark.png";
  const logoAlt = "CodeCafe Lab Logo Dark";

  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-24 items-center justify-between px-4">
          <div className="flex items-center gap-2" aria-label="CodeCafe Lab Home">
            <div style={{ width: 171, height: 43 }} />
          </div>
          <div className="flex items-center gap-4">
             <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
             </Button>
          </div>
        </div>
      </header>
    );
  }

  const closeSheet = () => setIsSheetOpen(false);

  const renderServiceSubMenuItems = (service: Service, isMobile: boolean = false) => {
    const commonClasses = "flex items-center gap-2 w-full text-left";
    const linkHref = `/services#${service.slug}`;
    
    if (isMobile) {
      return (
        <Link
          href={linkHref}
          onClick={closeSheet}
          className={cn(
            commonClasses,
            "block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
             pathname === linkHref ? "bg-accent text-accent-foreground" : "text-foreground"
          )}
        >
          {service.icon && <service.icon className="h-5 w-5" />}
          {service.title}
        </Link>
      );
    }

    return (
      <Link href={linkHref} className={commonClasses}>
        {service.icon && <service.icon className="h-4 w-4" />}
        {service.title}
      </Link>
    );
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-24 items-center justify-between px-4">
        <Link href="/" className="flex items-center" aria-label="CodeCafe Lab Home">
          <Image 
            src={logoSrc}
            alt={logoAlt}
            width={171} 
            height={43} 
            priority 
            data-ai-hint="company logo"
            key={logoSrc}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {NAV_LINKS.map((link) =>
            link.label === "Services" ? (
              <DropdownMenu key={link.href}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center gap-1 transition-colors hover:text-primary px-3 py-2 text-sm font-medium",
                      pathname.startsWith(link.href) ? "text-primary" : "text-foreground/60"
                    )}
                  >
                    {link.label}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                  {SERVICES_DATA.map((service) => (
                    <DropdownMenuItem key={service.slug} asChild>
                      {renderServiceSubMenuItems(service)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="ghost" key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "transition-colors hover:text-primary px-3 py-2 text-sm font-medium",
                    pathname === link.href ? "text-primary" : "text-foreground/60"
                  )}
                >
                  {link.label}
                </Link>
              </Button>
            )
          )}
        </nav>

        <div className="flex items-center gap-4">
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
                    width={140}
                    height={35}
                    data-ai-hint="company logo"
                    key={`sheet-${logoSrc}`}
                  />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-1 p-4">
                {NAV_LINKS.map((link) =>
                  link.label === "Services" ? (
                    <Accordion type="single" collapsible key={link.href} className="w-full">
                      <AccordionItem value="services" className="border-b-0">
                        <AccordionTrigger
                          className={cn(
                            "flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground no-underline",
                             pathname.startsWith(link.href) ? "bg-accent text-accent-foreground" : "text-foreground"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            {link.icon && <link.icon className="h-5 w-5" />}
                            {link.label}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-1 pb-0 pl-4">
                          <div className="flex flex-col space-y-1">
                            {SERVICES_DATA.map((service) => (
                               renderServiceSubMenuItems(service, true)
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
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
                  )
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
