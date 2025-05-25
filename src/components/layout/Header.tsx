
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, type LucideIcon, Info, Briefcase, Mail } from "lucide-react";
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
import type { ServiceMenuItem, SubService, NavItem } from '@/types';

interface CompanySubItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const COMPANY_SUB_LINKS: CompanySubItem[] = [
  { href: "/company", label: "About CodeCafe Lab", icon: Info },
  { href: "/career", label: "Career", icon: Briefcase },
  { href: "/contact", label: "Contact Us", icon: Mail },
];

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
          {/* Placeholder for logo size to prevent layout shift */}
          <div style={{ width: 171, height: 43 }} />
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>
    );
  }

  const closeSheet = () => setIsSheetOpen(false);

  const renderSubServiceLink = (categorySlug: string, subService: SubService, isMobile: boolean = false) => {
    const href = `/services#${subService.slug}`;
    const commonClasses = "block w-full text-left px-3 py-2 text-sm rounded-md transition-colors";
    // Check if the current path is /services and if the hash matches the subService slug
    const isActive = pathname === '/services' && typeof window !== 'undefined' && window.location.hash === `#${subService.slug}`;

    if (isMobile) {
      return (
        <Link
          key={subService.slug} // Added key here for list rendering
          href={href}
          onClick={closeSheet}
          className={cn(
            commonClasses,
            isActive
              ? "text-primary font-semibold"
              : "text-foreground/80 hover:text-primary"
          )}
        >
          {subService.title}
        </Link>
      );
    }

    return (
      <DropdownMenuItem
        key={subService.slug} // Added key here
        asChild
        className="p-0 focus:bg-accent focus:text-accent-foreground" // Let Radix handle focus style on item
      >
        <Link
          href={href}
          className={cn(
            commonClasses,
            "text-popover-foreground", // Base color for dropdown items
            isActive
              ? "text-primary font-semibold"
              : "hover:text-primary"
          )}
        >
          {subService.title}
        </Link>
      </DropdownMenuItem>
    );
  };

  const isCompanyLinkActive = (currentPathname: string) => {
    return COMPANY_SUB_LINKS.some(subLink => currentPathname === subLink.href || currentPathname.startsWith(subLink.href + '/'));
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
            key={logoSrc} // Unique key for Image if src changes
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {NAV_LINKS.map((link) => {
            if (link.label === "Services") {
              const isServicesActive = pathname.startsWith(link.href) || pathname === "/services";
              return (
                <DropdownMenu key={link.href}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex items-center gap-1 transition-colors px-3 py-2 text-sm font-medium",
                        isServicesActive
                          ? "text-primary font-semibold"
                          : "text-foreground/60 hover:text-primary"
                      )}
                    >
                      {link.label}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[720px] p-4 bg-background shadow-xl rounded-lg border-border" align="start">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                      {SERVICES_DATA.map((category) => (
                        <div key={category.slug}>
                          <h4 className="font-semibold text-base mb-2 flex items-center gap-2 text-primary px-3 py-1">
                            {category.icon && <category.icon className="h-5 w-5" />}
                            {category.title}
                          </h4>
                          <ul className="space-y-1">
                            {category.subServices.map((subService) => (
                              <li key={subService.slug}>
                                {renderSubServiceLink(category.slug, subService, false)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            if (link.label === "Company") {
              const companyActive = isCompanyLinkActive(pathname);
              return (
                <DropdownMenu key={link.href}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex items-center gap-1 transition-colors px-3 py-2 text-sm font-medium",
                        companyActive
                          ? "text-primary font-semibold"
                          : "text-foreground/60 hover:text-primary"
                      )}
                    >
                      {link.label}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 p-2 bg-background shadow-xl rounded-lg border-border" align="start">
                    {COMPANY_SUB_LINKS.map((subLink) => (
                      <DropdownMenuItem key={subLink.href} asChild className="p-0 focus:bg-accent focus:text-accent-foreground">
                        <Link
                          href={subLink.href}
                          className={cn(
                            "block w-full text-left px-3 py-2 text-sm rounded-md transition-colors text-popover-foreground flex items-center gap-2",
                            pathname === subLink.href
                              ? "text-primary font-semibold"
                              : "hover:text-primary"
                          )}
                        >
                          <subLink.icon className="h-4 w-4" />
                          {subLink.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            // For regular Nav links including "Home"
            const isActive = (link.href === "/" && pathname === "/") || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Button asChild variant="ghost" key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "transition-colors px-3 py-2 text-sm font-medium",
                    isActive
                      ? "text-primary font-semibold"
                      : "text-foreground/60 hover:text-primary"
                  )}
                >
                  {link.label}
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[300px] p-0 bg-background text-foreground">
              <SheetHeader className="p-4 border-b border-border">
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
                {NAV_LINKS.map((link) => {
                  if (link.label === "Services") {
                    const isServicesActive = pathname.startsWith(link.href) || pathname === "/services";
                    return (
                      <Accordion type="single" collapsible key={link.href} className="w-full">
                        <AccordionItem value="services-main" className="border-b-0">
                          <AccordionTrigger
                            className={cn(
                              "flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium transition-colors no-underline",
                              isServicesActive
                                ? "text-primary font-semibold"
                                : "text-foreground hover:text-primary"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              {link.icon && <link.icon className="h-5 w-5" />}
                              {link.label}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-1 pb-0 pl-2 space-y-1">
                            <Accordion type="multiple" className="w-full">
                              {SERVICES_DATA.map((category) => (
                                <AccordionItem value={category.slug} key={category.slug} className="border-b-0">
                                  <AccordionTrigger className={cn(
                                    "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium transition-colors no-underline",
                                    "text-foreground/80 hover:text-primary [&[data-state=open]]:text-primary"
                                  )}>
                                    <div className="flex items-center gap-2">
                                      {category.icon && <category.icon className="h-4 w-4" />}
                                      {category.title}
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="pt-1 pb-0 pl-4 space-y-1">
                                    {category.subServices.map((subService) => (
                                      renderSubServiceLink(category.slug, subService, true)
                                    ))}
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    );
                  }
                  if (link.label === "Company") {
                    const companyActive = isCompanyLinkActive(pathname);
                    return (
                       <Accordion type="single" collapsible key={link.href} className="w-full">
                        <AccordionItem value="company-main" className="border-b-0">
                          <AccordionTrigger
                            className={cn(
                              "flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium transition-colors no-underline",
                              companyActive
                                ? "text-primary font-semibold"
                                : "text-foreground hover:text-primary"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              {link.icon && <link.icon className="h-5 w-5" />}
                              {link.label}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-1 pb-0 pl-4 space-y-1">
                            {COMPANY_SUB_LINKS.map((subLink) => (
                              <Link
                                key={subLink.href}
                                href={subLink.href}
                                onClick={closeSheet}
                                className={cn(
                                  "block w-full text-left px-3 py-2 text-sm rounded-md transition-colors flex items-center gap-2",
                                  pathname === subLink.href
                                    ? "text-primary font-semibold"
                                    : "text-foreground/80 hover:text-primary"
                                )}
                              >
                                <subLink.icon className="h-4 w-4" />
                                {subLink.label}
                              </Link>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    );
                  }
                  // For regular Nav links in mobile sheet including "Home"
                  const isActive = (link.href === "/" && pathname === "/") || (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeSheet}
                      className={cn(
                        "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                        isActive
                          ? "text-primary font-semibold"
                          : "text-foreground hover:text-primary"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {link.icon && <link.icon className="h-5 w-5" />}
                        {link.label}
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
