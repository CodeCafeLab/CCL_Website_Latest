
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
          <div style={{ width: 171, height: 43 }} /> {/* Placeholder for logo size */}
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
    const activeClass = "bg-white text-black";
    const hoverClass = "hover:bg-white hover:text-black";
    const inactiveClass = "text-foreground/80";
    const isActive = pathname === '/services' && typeof window !== 'undefined' && window.location.hash === `#${subService.slug}`;

    if (isMobile) {
      return (
        <Link
          href={href}
          onClick={closeSheet}
          className={cn(commonClasses, isActive ? activeClass : cn(inactiveClass, hoverClass))}
        >
          {subService.title}
        </Link>
      );
    }

    return (
      <DropdownMenuItem
        asChild
        className={cn("p-0 focus:bg-transparent focus:text-black", isActive ? activeClass : cn("focus:bg-white focus:text-black", hoverClass))}
      >
        <Link href={href} className={cn(commonClasses, "text-popover-foreground", isActive ? activeClass : hoverClass)}>
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
            key={logoSrc}
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {NAV_LINKS.map((link) => {
            if (link.label === "Services") {
              return (
                <DropdownMenu key={link.href}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex items-center gap-1 transition-colors px-3 py-2 text-sm font-medium",
                        pathname.startsWith(link.href) || pathname === "/services"
                          ? "bg-white text-black"
                          : "text-foreground/60 hover:bg-white hover:text-black"
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
              return (
                <DropdownMenu key={link.href}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex items-center gap-1 transition-colors px-3 py-2 text-sm font-medium",
                        isCompanyLinkActive(pathname)
                          ? "bg-white text-black"
                          : "text-foreground/60 hover:bg-white hover:text-black"
                      )}
                    >
                      {link.label}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 p-2 bg-background shadow-xl rounded-lg border-border" align="start">
                    {COMPANY_SUB_LINKS.map((subLink) => (
                      <DropdownMenuItem key={subLink.href} asChild className={cn("p-0 focus:bg-transparent focus:text-black", pathname === subLink.href ? "bg-white text-black" : "focus:bg-white focus:text-black hover:bg-white hover:text-black")}>
                        <Link href={subLink.href} className="block w-full text-left px-3 py-2 text-sm rounded-md transition-colors text-popover-foreground flex items-center gap-2">
                          <subLink.icon className="h-4 w-4" />
                          {subLink.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            return (
              <Button asChild variant="ghost" key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "transition-colors px-3 py-2 text-sm font-medium",
                    pathname === link.href
                      ? "bg-white text-black"
                      : "text-foreground/60 hover:bg-white hover:text-black"
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
                    return (
                      <Accordion type="single" collapsible key={link.href} className="w-full">
                        <AccordionItem value="services-main" className="border-b-0">
                          <AccordionTrigger
                            className={cn(
                              "flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium transition-colors no-underline hover:bg-white hover:text-black",
                              pathname.startsWith(link.href) || pathname === "/services"
                                ? "bg-white text-black"
                                : "text-foreground"
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
                                    "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium transition-colors no-underline hover:bg-white hover:text-black",
                                    "text-foreground/80 [&[data-state=open]]:bg-white/90 [&[data-state=open]]:text-black"
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
                    return (
                       <Accordion type="single" collapsible key={link.href} className="w-full">
                        <AccordionItem value="company-main" className="border-b-0">
                          <AccordionTrigger
                            className={cn(
                              "flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium transition-colors no-underline hover:bg-white hover:text-black",
                              isCompanyLinkActive(pathname)
                                ? "bg-white text-black"
                                : "text-foreground"
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
                                    ? "bg-white text-black"
                                    : "text-foreground/80 hover:bg-white hover:text-black"
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
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeSheet}
                      className={cn(
                        "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                        pathname === link.href
                          ? "bg-white text-black"
                          : "text-foreground hover:bg-white hover:text-black"
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
