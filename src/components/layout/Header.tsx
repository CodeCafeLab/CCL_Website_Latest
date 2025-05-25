
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, type LucideIcon, Info, Briefcase, Mail, ArrowRight, CircleDollarSign, Users2, Award, Handshake, CalendarPlus, Lightbulb, Smartphone, Globe, Server, Brain, GitMerge, LayoutGrid, Puzzle, TrendingUp, Settings, DollarSign, Star, Link as LinkIcon, Clock, Car, QrCode, Package, Home, School, ChefHat, MessageSquare as MessageSquareIcon, Wrench, Truck, MonitorSmartphone, BarChart3, FileText, BarChartHorizontalBig, DownloadCloud, Newspaper, CalendarClock, HelpCircle, BookOpenText, MailPlus } from "lucide-react";
import { NAV_LINKS, SERVICES_DATA, ServiceMenuItem as AppServiceMenuItem, SITE_NAME, COMPANY_SUB_LINKS, ProductSubMenuItem as AppProductSubMenuItem, PRODUCT_SUB_LINKS, RESOURCES_SUB_LINKS } from "@/lib/constants";
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
import { useState, useEffect, useRef } from "react";
import type { SubService } from '@/types';


export default function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [resourcesMenuOpen, setResourcesMenuOpen] = useState(false);


  const servicesMenuTimerRef = useRef<NodeJS.Timeout | null>(null);
  const companyMenuTimerRef = useRef<NodeJS.Timeout | null>(null);
  const productsMenuTimerRef = useRef<NodeJS.Timeout | null>(null);
  const resourcesMenuTimerRef = useRef<NodeJS.Timeout | null>(null);

  const HOVER_MENU_CLOSE_DELAY = 200; 

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (servicesMenuTimerRef.current) clearTimeout(servicesMenuTimerRef.current);
      if (companyMenuTimerRef.current) clearTimeout(companyMenuTimerRef.current);
      if (productsMenuTimerRef.current) clearTimeout(productsMenuTimerRef.current);
      if (resourcesMenuTimerRef.current) clearTimeout(resourcesMenuTimerRef.current);
    };
  }, []);

  const logoSrc = "/codecafe_logo_dark.png"; 
  const logoAlt = `${SITE_NAME} Logo (Dark Mode)`;

  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-24 items-center justify-between px-4">
          <div style={{ width: 171, height: 43 }} />
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>
    );
  }

  const closeSheet = () => setIsSheetOpen(false);

  const handleMenuInteraction = (
    menuToControl: 'services' | 'company' | 'products' | 'resources',
    action: 'enter' | 'leave'
  ) => {
    let setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    let otherSetOpens: React.Dispatch<React.SetStateAction<boolean>>[] = [];
    let timerRef: React.MutableRefObject<NodeJS.Timeout | null>;
    let clearOtherTimers: (()=>void)[] = [];
  
    if (menuToControl === 'services') {
      setOpen = setServicesMenuOpen;
      otherSetOpens = [setCompanyMenuOpen, setProductsMenuOpen, setResourcesMenuOpen];
      timerRef = servicesMenuTimerRef;
      if (companyMenuTimerRef.current) clearOtherTimers.push(() => clearTimeout(companyMenuTimerRef.current!));
      if (productsMenuTimerRef.current) clearOtherTimers.push(() => clearTimeout(productsMenuTimerRef.current!));
      if (resourcesMenuTimerRef.current) clearOtherTimers.push(() => clearTimeout(resourcesMenuTimerRef.current!));
    } else if (menuToControl === 'company') {
      setOpen = setCompanyMenuOpen;
      otherSetOpens = [setServicesMenuOpen, setProductsMenuOpen, setResourcesMenuOpen];
      timerRef = companyMenuTimerRef;
      if (servicesMenuTimerRef.current) clearOtherTimers.push(() => clearTimeout(servicesMenuTimerRef.current!));
      if (productsMenuTimerRef.current) clearOtherTimers.push(() => clearTimeout(productsMenuTimerRef.current!));
      if (resourcesMenuTimerRef.current) clearOtherTimers.push(() => clearTimeout(resourcesMenuTimerRef.current!));
    } else if (menuToControl === 'products') {
      setOpen = setProductsMenuOpen;
      otherSetOpens = [setServicesMenuOpen, setCompanyMenuOpen, setResourcesMenuOpen];
      timerRef = productsMenuTimerRef;
      if (servicesMenuTimerRef.current) clearOtherTimers.push(() => clearTimeout(servicesMenuTimerRef.current!));
      if (companyMenuTimerRef.current) clearOtherTimers.push(() => clearTimeout(companyMenuTimerRef.current!));
      if (resourcesMenuTimerRef.current) clearOtherTimers.push(() => clearTimeout(resourcesMenuTimerRef.current!));
    } else { // resources
      setOpen = setResourcesMenuOpen;
      otherSetOpens = [setServicesMenuOpen, setCompanyMenuOpen, setProductsMenuOpen];
      timerRef = resourcesMenuTimerRef;
      if (servicesMenuTimerRef.current) clearOtherTimers.push(() => clearTimeout(servicesMenuTimerRef.current!));
      if (companyMenuTimerRef.current) clearOtherTimers.push(() => clearTimeout(companyMenuTimerRef.current!));
      if (productsMenuTimerRef.current) clearOtherTimers.push(() => clearTimeout(productsMenuTimerRef.current!));
    }
  
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  
    if (action === 'enter') {
      setOpen(true);
      otherSetOpens.forEach(setFn => setFn(false));
      clearOtherTimers.forEach(clearFn => clearFn());
    } else { // action === 'leave'
      timerRef.current = setTimeout(() => {
        setOpen(false);
        timerRef.current = null;
      }, HOVER_MENU_CLOSE_DELAY);
    }
  };
  
  const createOpenChangeHandler = (
    menuToControl: 'services' | 'company' | 'products' | 'resources'
  ) => (open: boolean) => {
    if (menuToControl === 'services') {
      setServicesMenuOpen(open);
      if (servicesMenuTimerRef.current) clearTimeout(servicesMenuTimerRef.current);
      if (open) {
        setCompanyMenuOpen(false); if (companyMenuTimerRef.current) clearTimeout(companyMenuTimerRef.current);
        setProductsMenuOpen(false); if (productsMenuTimerRef.current) clearTimeout(productsMenuTimerRef.current);
        setResourcesMenuOpen(false); if (resourcesMenuTimerRef.current) clearTimeout(resourcesMenuTimerRef.current);
      }
    } else if (menuToControl === 'company') {
      setCompanyMenuOpen(open);
      if (companyMenuTimerRef.current) clearTimeout(companyMenuTimerRef.current);
      if (open) {
        setServicesMenuOpen(false); if (servicesMenuTimerRef.current) clearTimeout(servicesMenuTimerRef.current);
        setProductsMenuOpen(false); if (productsMenuTimerRef.current) clearTimeout(productsMenuTimerRef.current);
        setResourcesMenuOpen(false); if (resourcesMenuTimerRef.current) clearTimeout(resourcesMenuTimerRef.current);
      }
    } else if (menuToControl === 'products') {
      setProductsMenuOpen(open);
      if (productsMenuTimerRef.current) clearTimeout(productsMenuTimerRef.current);
      if (open) {
        setServicesMenuOpen(false); if (servicesMenuTimerRef.current) clearTimeout(servicesMenuTimerRef.current);
        setCompanyMenuOpen(false); if (companyMenuTimerRef.current) clearTimeout(companyMenuTimerRef.current);
        setResourcesMenuOpen(false); if (resourcesMenuTimerRef.current) clearTimeout(resourcesMenuTimerRef.current);
      }
    } else { // resources
        setResourcesMenuOpen(open);
        if (resourcesMenuTimerRef.current) clearTimeout(resourcesMenuTimerRef.current);
        if (open) {
            setServicesMenuOpen(false); if (servicesMenuTimerRef.current) clearTimeout(servicesMenuTimerRef.current);
            setCompanyMenuOpen(false); if (companyMenuTimerRef.current) clearTimeout(companyMenuTimerRef.current);
            setProductsMenuOpen(false); if (productsMenuTimerRef.current) clearTimeout(productsMenuTimerRef.current);
        }
    }
  };
  
  const onServicesOpenChange = createOpenChangeHandler('services');
  const onCompanyOpenChange = createOpenChangeHandler('company');
  const onProductsOpenChange = createOpenChangeHandler('products');
  const onResourcesOpenChange = createOpenChangeHandler('resources');

  const isCompanyLinkActive = (currentPathname: string) => {
    return COMPANY_SUB_LINKS.some(subLink => currentPathname === subLink.href || currentPathname.startsWith(subLink.href + '/'));
  };
  const isResourcesLinkActive = (currentPathname: string) => {
    // "Resources" main link itself points to /blog.
    // Check if current path is /blog or any of the sublink hrefs (if they are not just #)
    if (currentPathname === '/blog' || currentPathname.startsWith('/blog/')) return true;
    return RESOURCES_SUB_LINKS.some(subLink => subLink.href !== "#" && (currentPathname === subLink.href || currentPathname.startsWith(subLink.href + '/')));
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-24 items-center justify-between px-4">
        <Link href="/" className="flex items-center" aria-label={`${SITE_NAME} Home`}>
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={171}
            height={43}
            priority
            data-ai-hint="company logo dark"
            key={logoSrc} 
          />
        </Link>

        <div className="flex items-center flex-grow justify-center"> 
            <nav className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map((link) => {
                const isActive = (link.href === "/" && pathname === "/") || (link.href !== "/" && pathname.startsWith(link.href));
                
                if (link.label === "Services") {
                const isServicesActive = (pathname.startsWith(link.href) || pathname === "/services") || servicesMenuOpen;
                return (
                    <DropdownMenu
                        key={link.href}
                        open={servicesMenuOpen}
                        onOpenChange={onServicesOpenChange}
                    >
                    <DropdownMenuTrigger asChild>
                        <Button
                        variant="ghost"
                        className={cn(
                            "flex items-center gap-1 transition-colors px-3 py-2 text-sm font-medium focus-visible:ring-0 focus-visible:ring-offset-0 outline-none", 
                            isServicesActive
                            ? "text-primary font-semibold" 
                            : "text-foreground/60 hover:text-white" 
                        )}
                        onMouseEnter={() => handleMenuInteraction('services', 'enter')}
                        onMouseLeave={() => handleMenuInteraction('services', 'leave')}
                        aria-expanded={servicesMenuOpen}
                        >
                        {link.label}
                        <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-screen max-w-none p-0" 
                        onMouseEnter={() => handleMenuInteraction('services', 'enter')}
                        onMouseLeave={() => handleMenuInteraction('services', 'leave')}
                        sideOffset={15} 
                    >
                        <div className="bg-background shadow-xl rounded-lg border-border">
                            <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 max-h-[75vh] overflow-y-auto">
                            {SERVICES_DATA.map((category: AppServiceMenuItem) => (
                                <div key={category.slug}>
                                <h4 className="font-semibold text-base mb-2 flex items-center gap-2 text-primary px-3 py-1">
                                    {category.icon && <category.icon className="h-5 w-5" />}
                                    {category.title}
                                </h4>
                                <ul className="space-y-1">
                                    {category.subServices.slice(0, 4).map((subService) => {
                                    const href = `/services#${category.slug}-${subService.slug}`;
                                    return (
                                        <li key={subService.slug} className="group">
                                        <Link
                                            href={href}
                                            className={cn(
                                            "block text-sm font-medium rounded-md transition-colors px-3 py-1.5 text-foreground/80 hover:text-white"
                                            )}
                                            onClick={() => setServicesMenuOpen(false)}
                                        >
                                            {subService.title}
                                        </Link>
                                        </li>
                                    );
                                    })}
                                    {category.subServices.length > 4 && (
                                    <li className="group">
                                        <Link
                                        href={`/services#${category.slug}`}
                                        className="block text-sm font-semibold rounded-md transition-colors px-3 py-1.5 text-primary hover:text-white flex items-center gap-1"
                                        onClick={() => setServicesMenuOpen(false)}
                                        >
                                        See All <ArrowRight className="ml-1 h-4 w-4" />
                                        </Link>
                                    </li>
                                    )}
                                </ul>
                                </div>
                            ))}
                            </div>
                        </div>
                    </DropdownMenuContent>
                    </DropdownMenu>
                );
                }
                if (link.label === "Company") {
                const companyActive = isCompanyLinkActive(pathname) || companyMenuOpen;
                return (
                    <DropdownMenu
                        key={link.href}
                        open={companyMenuOpen}
                        onOpenChange={onCompanyOpenChange}
                    >
                    <DropdownMenuTrigger asChild>
                        <Button
                        variant="ghost"
                        className={cn(
                            "flex items-center gap-1 transition-colors px-3 py-2 text-sm font-medium focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
                            companyActive
                            ? "text-primary font-semibold" 
                            : "text-foreground/60 hover:text-white" 
                        )}
                        onMouseEnter={() => handleMenuInteraction('company', 'enter')}
                        onMouseLeave={() => handleMenuInteraction('company', 'leave')}
                        aria-expanded={companyMenuOpen}
                        >
                        {link.label}
                        <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-96 p-2 bg-background shadow-xl rounded-lg border-border"
                        onMouseEnter={() => handleMenuInteraction('company', 'enter')}
                        onMouseLeave={() => handleMenuInteraction('company', 'leave')}
                        sideOffset={15} 
                    >
                        {COMPANY_SUB_LINKS.map((subLink) => (
                        <DropdownMenuItem key={subLink.href} asChild className="p-0 rounded-md hover:bg-muted/30 focus:bg-muted/30">
                            <Link
                                href={subLink.href}
                                onClick={() => setCompanyMenuOpen(false)}
                                className={cn(
                                "block w-full text-left px-3 py-2.5 text-sm transition-colors flex items-start gap-3",
                                (pathname === subLink.href || pathname.startsWith(subLink.href + '/')) && "font-semibold"
                                )}
                            >
                            {subLink.icon && <subLink.icon className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />}
                            <div>
                                <span className="font-medium text-primary">{subLink.label}</span>
                                {subLink.description && (
                                    <p className="text-xs text-muted-foreground/80 mt-1 whitespace-normal">
                                        {subLink.description}
                                    </p>
                                )}
                            </div>
                            </Link>
                        </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                    </DropdownMenu>
                );
                }
                if (link.label === "Products") {
                  const isProductsActive = (pathname.startsWith(link.href) || pathname === "/products") || productsMenuOpen;
                  return (
                    <DropdownMenu
                      key={link.href}
                      open={productsMenuOpen}
                      onOpenChange={onProductsOpenChange}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "flex items-center gap-1 transition-colors px-3 py-2 text-sm font-medium focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
                            isProductsActive
                              ? "text-primary font-semibold"
                              : "text-foreground/60 hover:text-white"
                          )}
                          onMouseEnter={() => handleMenuInteraction('products', 'enter')}
                          onMouseLeave={() => handleMenuInteraction('products', 'leave')}
                          aria-expanded={productsMenuOpen}
                        >
                          {link.label}
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-screen max-w-none p-0"
                        onMouseEnter={() => handleMenuInteraction('products', 'enter')}
                        onMouseLeave={() => handleMenuInteraction('products', 'leave')}
                        sideOffset={15}
                      >
                        <div className="bg-background shadow-xl rounded-lg border-border">
                            <div className="px-6 py-6 grid lg:grid-cols-4 gap-x-8 gap-y-6 max-h-[80vh] overflow-y-auto">
                            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
                                {PRODUCT_SUB_LINKS.map((subLink) => (
                                <div key={subLink.label} className="p-0 rounded-md hover:bg-muted/30 focus-within:bg-muted/30">
                                    <Link
                                    href={subLink.href}
                                    onClick={() => setProductsMenuOpen(false)}
                                    className={cn(
                                        "block w-full h-full text-left px-3 py-2.5 text-sm transition-colors flex items-start gap-3 rounded-md",
                                        (pathname === subLink.href) && "font-semibold" 
                                    )}
                                    >
                                    {subLink.icon && <subLink.icon className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />}
                                    <div className="flex-1">
                                        <span className="font-medium text-primary">{subLink.label}</span>
                                        {subLink.subtitle && (
                                        <p className="text-xs text-muted-foreground/70 -mt-0.5 mb-0.5">
                                            {subLink.subtitle}
                                        </p>
                                        )}
                                        {subLink.description && (
                                        <p className="text-xs text-muted-foreground/80 whitespace-normal">
                                            {subLink.description}
                                        </p>
                                        )}
                                    </div>
                                    </Link>
                                </div>
                                ))}
                            </div>
                            <div className="hidden lg:flex lg:col-span-1 flex-col gap-6 pt-1">
                                <Link href="/contact?demo=true" className="block p-6 rounded-xl shadow-lg bg-gradient-to-br from-primary to-accent text-white hover:shadow-xl transition-shadow duration-300 group">
                                <h3 className="text-lg font-semibold mb-1 flex items-center">
                                    <CalendarPlus className="mr-2 h-5 w-5"/> Book a Demo
                                </h3>
                                <p className="text-sm opacity-90 mb-3">See our products in action. Schedule a personalized demonstration.</p>
                                <span className="inline-flex items-center text-sm font-medium group-hover:underline">
                                    Request Now <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                                </Link>
                                <Link href="/contact?partner=true" className="block p-6 rounded-xl shadow-lg bg-gradient-to-br from-accent to-primary text-white hover:shadow-xl transition-shadow duration-300 group">
                                <h3 className="text-lg font-semibold mb-1 flex items-center">
                                    <Handshake className="mr-2 h-5 w-5"/> Partner With Us
                                </h3>
                                <p className="text-sm opacity-90 mb-3">Explore opportunities to collaborate and grow together.</p>
                                <span className="inline-flex items-center text-sm font-medium group-hover:underline">
                                    Learn More <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                                </Link>
                            </div>
                            </div>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                }
                if (link.label === "Resources") {
                    const resourcesActive = isResourcesLinkActive(pathname) || resourcesMenuOpen;
                    return (
                        <DropdownMenu
                            key={link.href}
                            open={resourcesMenuOpen}
                            onOpenChange={onResourcesOpenChange}
                        >
                        <DropdownMenuTrigger asChild>
                            <Button
                            variant="ghost"
                            className={cn(
                                "flex items-center gap-1 transition-colors px-3 py-2 text-sm font-medium focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
                                resourcesActive
                                ? "text-primary font-semibold" 
                                : "text-foreground/60 hover:text-white" 
                            )}
                            onMouseEnter={() => handleMenuInteraction('resources', 'enter')}
                            onMouseLeave={() => handleMenuInteraction('resources', 'leave')}
                            aria-expanded={resourcesMenuOpen}
                            >
                            {link.label}
                            <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[400px] p-2 bg-background shadow-xl rounded-lg border-border max-h-[75vh] overflow-y-auto"
                            onMouseEnter={() => handleMenuInteraction('resources', 'enter')}
                            onMouseLeave={() => handleMenuInteraction('resources', 'leave')}
                            sideOffset={15} 
                        >
                            {RESOURCES_SUB_LINKS.map((subLink) => (
                            <DropdownMenuItem key={subLink.href} asChild className="p-0 rounded-md hover:bg-muted/30 focus:bg-muted/30">
                                <Link
                                    href={subLink.href}
                                    onClick={() => setResourcesMenuOpen(false)}
                                    className={cn(
                                    "block w-full text-left px-3 py-2.5 text-sm transition-colors flex items-start gap-3",
                                    (pathname === subLink.href || (subLink.href !== "#" && pathname.startsWith(subLink.href + '/'))) && "font-semibold"
                                    )}
                                >
                                {subLink.icon && <subLink.icon className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />}
                                <div>
                                    <span className="font-medium text-primary">{subLink.label}</span>
                                    {subLink.description && (
                                        <p className="text-xs text-muted-foreground/80 mt-1 whitespace-normal">
                                            {subLink.description}
                                        </p>
                                    )}
                                </div>
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
                        "transition-colors px-3 py-2 text-sm font-medium focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
                        isActive
                        ? "text-primary font-semibold" 
                        : "text-foreground/60 hover:text-white" 
                    )}
                    >
                    {link.label}
                    </Link>
                </Button>
                );
            })}
            </nav>
        </div>

        <div className="hidden md:flex items-center ml-4 group">
            <Button asChild className="rounded-full group bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/contact">
                    Talk to Us
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200 ease-in-out" />
                </Link>
            </Button>
        </div>


        <div className="flex items-center gap-4 md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
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
                    data-ai-hint="company logo dark"
                    key={`sheet-${logoSrc}`}
                  />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-1 p-4">
                {NAV_LINKS.map((link) => {
                  const isActive = (link.href === "/" && pathname === "/") || (link.href !== "/" && pathname.startsWith(link.href));
                  if (link.label === "Services") {
                    const isServicesActive = pathname.startsWith(link.href) || pathname === "/services";
                    return (
                      <Accordion type="single" collapsible key={link.href} className="w-full">
                        <AccordionItem value="services-main" className="border-b-0">
                          <AccordionTrigger
                            className={cn(
                              "flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium transition-colors no-underline focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
                              isServicesActive
                                ? "text-primary font-semibold" 
                                : "text-foreground hover:text-white" 
                            )}
                          >
                            <div className="flex items-center gap-3">
                              {link.icon && <link.icon className="h-5 w-5" />}
                              {link.label}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-1 pb-0 pl-2 space-y-1">
                            <Accordion type="multiple" className="w-full">
                              {SERVICES_DATA.map((category: AppServiceMenuItem) => (
                                <AccordionItem value={category.slug} key={category.slug} className="border-b-0">
                                  <AccordionTrigger className={cn(
                                    "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium transition-colors no-underline [&[data-state=open]]:text-primary focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
                                    "text-foreground/80 hover:text-white" 
                                  )}>
                                    <div className="flex items-center gap-2">
                                      {category.icon && <category.icon className="h-4 w-4" />}
                                      {category.title}
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="pt-1 pb-0 pl-3 space-y-0.5">
                                    {category.subServices.slice(0,4).map((subService) => (
                                       <div key={subService.slug} className="py-1">
                                       <Link
                                         href={`/services#${category.slug}-${subService.slug}`}
                                         onClick={closeSheet}
                                         className={cn(
                                           "block w-full text-left text-sm rounded-md transition-colors group focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
                                           (typeof window !== 'undefined' && window.location.hash === `#${category.slug}-${subService.slug}` && pathname === '/services')
                                             ? "text-primary font-semibold"
                                             : "text-foreground/80 hover:text-white"
                                         )}
                                       >
                                         {subService.title}
                                       </Link>
                                     </div>
                                    ))}
                                    {category.subServices.length > 4 && (
                                      <div className="py-1">
                                        <Link
                                          href={`/services#${category.slug}`}
                                          onClick={closeSheet}
                                          className="block w-full text-left text-sm rounded-md transition-colors group focus-visible:ring-0 focus-visible:ring-offset-0 outline-none text-primary font-semibold hover:text-white flex items-center gap-1"
                                        >
                                          See All <ArrowRight className="h-4 w-4" />
                                        </Link>
                                      </div>
                                    )}
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
                              "flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium transition-colors no-underline focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
                              companyActive
                                ? "text-primary font-semibold" 
                                : "text-foreground hover:text-white" 
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
                                  "block w-full text-left px-3 py-2.5 text-sm rounded-md transition-colors flex items-start gap-3",
                                  (pathname === subLink.href || pathname.startsWith(subLink.href + '/')) && "font-semibold",
                                  "hover:bg-muted/30 focus:bg-muted/30"
                                )}
                              >
                                {subLink.icon && <subLink.icon className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />}
                                <div>
                                    <span className="font-medium text-primary">{subLink.label}</span>
                                    {subLink.description && (
                                        <p className="text-xs text-muted-foreground/80 mt-0.5 whitespace-normal">
                                            {subLink.description}
                                        </p>
                                    )}
                                </div>
                              </Link>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    );
                  }
                  if (link.label === "Products") {
                    const isProductsActive = pathname.startsWith(link.href) || pathname === "/products";
                    return (
                      <Accordion type="single" collapsible key={link.href} className="w-full">
                        <AccordionItem value="products-main" className="border-b-0">
                          <AccordionTrigger
                            className={cn(
                              "flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium transition-colors no-underline focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
                              isProductsActive
                                ? "text-primary font-semibold"
                                : "text-foreground hover:text-white"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              {link.icon && <link.icon className="h-5 w-5" />}
                              {link.label}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-1 pb-0 pl-4 space-y-1 max-h-[50vh] overflow-y-auto">
                            {PRODUCT_SUB_LINKS.map((subLink) => (
                              <Link
                                key={subLink.label}
                                href={subLink.href}
                                onClick={closeSheet}
                                className={cn(
                                  "block w-full text-left px-3 py-2.5 text-sm rounded-md transition-colors flex items-start gap-3",
                                  (pathname === subLink.href) && "font-semibold",
                                  "hover:bg-muted/30 focus:bg-muted/30"
                                )}
                              >
                                {subLink.icon && <subLink.icon className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />}
                                <div className="flex-1">
                                  <span className="font-medium text-primary">{subLink.label}</span>
                                  {subLink.subtitle && (
                                    <p className="text-xs text-muted-foreground/70 -mt-0.5 mb-0.5">
                                      {subLink.subtitle}
                                    </p>
                                  )}
                                  {subLink.description && (
                                    <p className="text-xs text-muted-foreground/80 mt-0.5 whitespace-normal">
                                      {subLink.description}
                                    </p>
                                  )}
                                </div>
                              </Link>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    );
                  }
                  if (link.label === "Resources") {
                    const resourcesActive = isResourcesLinkActive(pathname);
                    return (
                       <Accordion type="single" collapsible key={link.href} className="w-full">
                        <AccordionItem value="resources-main" className="border-b-0">
                          <AccordionTrigger
                            className={cn(
                              "flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium transition-colors no-underline focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
                              resourcesActive
                                ? "text-primary font-semibold" 
                                : "text-foreground hover:text-white" 
                            )}
                          >
                            <div className="flex items-center gap-3">
                              {link.icon && <link.icon className="h-5 w-5" />}
                              {link.label}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-1 pb-0 pl-4 space-y-1 max-h-[50vh] overflow-y-auto">
                            {RESOURCES_SUB_LINKS.map((subLink) => (
                              <Link
                                key={subLink.href}
                                href={subLink.href}
                                onClick={closeSheet}
                                className={cn(
                                  "block w-full text-left px-3 py-2.5 text-sm rounded-md transition-colors flex items-start gap-3",
                                  (pathname === subLink.href || (subLink.href !== "#" && pathname.startsWith(subLink.href + '/'))) && "font-semibold",
                                  "hover:bg-muted/30 focus:bg-muted/30"
                                )}
                              >
                                {subLink.icon && <subLink.icon className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />}
                                <div>
                                    <span className="font-medium text-primary">{subLink.label}</span>
                                    {subLink.description && (
                                        <p className="text-xs text-muted-foreground/80 mt-0.5 whitespace-normal">
                                            {subLink.description}
                                        </p>
                                    )}
                                </div>
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
                        "block px-3 py-2 rounded-md text-base font-medium transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
                        isActive
                          ? "text-primary font-semibold" 
                          : "text-foreground hover:text-white" 
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
