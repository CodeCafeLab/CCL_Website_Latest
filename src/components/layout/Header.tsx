"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  ChevronDown,
  type LucideIcon,
  Info,
  Briefcase,
  Mail,
  ArrowRight,
  CircleDollarSign,
  Users2,
  Award,
  Handshake,
  CalendarPlus,
  Lightbulb,
  Smartphone,
  Globe,
  Server,
  Brain,
  GitMerge,
  LayoutGrid,
  Puzzle,
  TrendingUp,
  Settings,
  DollarSign,
  Star,
  Link as LinkIcon,
  Clock,
  Car,
  QrCode,
  Package,
  Home as HomeIcon,
  School,
  ChefHat,
  MessageSquare as MessageSquareIcon,
  Wrench,
  Truck,
  MonitorSmartphone,
  BarChart3,
  FileText,
  BarChartHorizontalBig,
  DownloadCloud,
  Newspaper,
  CalendarClock,
  HelpCircle,
  BookOpenText,
  MailPlus,
  Code,
  Layers,
  Palette,
  Cloud,
  Zap,
  Shield,
  PlayCircle,
} from "lucide-react";
import {
  NAV_LINKS,
  SERVICES_DATA,
  SITE_NAME,
  COMPANY_SUB_LINKS,
  PRODUCT_SUB_LINKS,
  RESOURCES_SUB_LINKS,
} from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import type { ServiceMenuItem } from "@/types";
import React from "react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Header() {
  // All hooks at the top!
  const { user, login, logout, loading } = useAuth();
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
  const servicesBycategories = React.useMemo(() => {
    return SERVICES_DATA.reduce((acc, service) => {
      const categories = service.categories;
      if (!acc[categories]) {
        acc[categories] = [];
      }
      acc[categories].push(service);
      return acc;
    }, {} as Record<string, ServiceMenuItem[]>);
  }, []);
  const categoriesIcons: Record<string, LucideIcon> = {
    Development: Code,
    Design: Palette,
    Marketing: TrendingUp,
    Infrastructure: Cloud,
  };
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (servicesMenuTimerRef.current)
        clearTimeout(servicesMenuTimerRef.current);
      if (companyMenuTimerRef.current)
        clearTimeout(companyMenuTimerRef.current);
      if (productsMenuTimerRef.current)
        clearTimeout(productsMenuTimerRef.current);
      if (resourcesMenuTimerRef.current)
        clearTimeout(resourcesMenuTimerRef.current);
    };
  }, []);

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
    menuToControl: "services" | "company" | "products" | "resources",
    action: "enter" | "leave"
  ) => {
    const setMenuStateFunctions = {
      services: setServicesMenuOpen,
      company: setCompanyMenuOpen,
      products: setProductsMenuOpen,
      resources: setResourcesMenuOpen,
    };
    const menuTimerRefs = {
      services: servicesMenuTimerRef,
      company: companyMenuTimerRef,
      products: productsMenuTimerRef,
      resources: resourcesMenuTimerRef,
    };

    const currentSetOpen = setMenuStateFunctions[menuToControl];
    const currentTimerRef = menuTimerRefs[menuToControl];

    if (currentTimerRef.current) {
      clearTimeout(currentTimerRef.current);
      currentTimerRef.current = null;
    }

    if (action === "enter") {
      currentSetOpen(true);
      // Close other menus
      Object.keys(setMenuStateFunctions).forEach((key) => {
        if (key !== menuToControl) {
          setMenuStateFunctions[key as keyof typeof setMenuStateFunctions](
            false
          );
          if (menuTimerRefs[key as keyof typeof menuTimerRefs].current) {
            clearTimeout(
              menuTimerRefs[key as keyof typeof menuTimerRefs].current!
            );
            menuTimerRefs[key as keyof typeof menuTimerRefs].current = null;
          }
        }
      });
    } else {
      // action === 'leave'
      currentTimerRef.current = setTimeout(() => {
        currentSetOpen(false);
        currentTimerRef.current = null;
      }, HOVER_MENU_CLOSE_DELAY);
    }
  };

  const createOpenChangeHandler =
    (menuToControl: "services" | "company" | "products" | "resources") =>
    (open: boolean) => {
      const setMenuStateFunctions = {
        services: setServicesMenuOpen,
        company: setCompanyMenuOpen,
        products: setProductsMenuOpen,
        resources: setResourcesMenuOpen,
      };
      const menuTimerRefs = {
        services: servicesMenuTimerRef,
        company: companyMenuTimerRef,
        products: productsMenuTimerRef,
        resources: resourcesMenuTimerRef,
      };

      const currentSetOpen = setMenuStateFunctions[menuToControl];
      const currentTimerRef = menuTimerRefs[menuToControl];

      currentSetOpen(open);
      if (currentTimerRef.current) {
        clearTimeout(currentTimerRef.current);
        currentTimerRef.current = null;
      }

      if (open) {
        Object.keys(setMenuStateFunctions).forEach((key) => {
          if (key !== menuToControl) {
            setMenuStateFunctions[key as keyof typeof setMenuStateFunctions](
              false
            );
            if (menuTimerRefs[key as keyof typeof menuTimerRefs].current) {
              clearTimeout(
                menuTimerRefs[key as keyof typeof menuTimerRefs].current!
              );
              menuTimerRefs[key as keyof typeof menuTimerRefs].current = null;
            }
          }
        });
      }
    };

  const onServicesOpenChange = createOpenChangeHandler("services");
  const onCompanyOpenChange = createOpenChangeHandler("company");
  const onProductsOpenChange = createOpenChangeHandler("products");
  const onResourcesOpenChange = createOpenChangeHandler("resources");

  const isCompanyLinkActive = (currentPathname: string) => {
    return COMPANY_SUB_LINKS.some(
      (subLink) =>
        currentPathname === subLink.href ||
        currentPathname.startsWith(subLink.href + "/")
    );
  };
  const isResourcesLinkActive = (currentPathname: string) => {
    if (currentPathname === "/blog" || currentPathname.startsWith("/blog/"))
      return true;
    return RESOURCES_SUB_LINKS.some(
      (subLink) =>
        subLink.href !== "#" &&
        (currentPathname === subLink.href ||
          currentPathname.startsWith(subLink.href + "/"))
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-24 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center"
          aria-label={`${SITE_NAME} Home`}
        >
          <Image
            src="/codecafe_logo_dark.png"
            alt={`${SITE_NAME} Logo (Dark Mode)`}
            width={171}
            height={43}
            priority
            data-ai-hint="company logo dark"
            key="/codecafe_logo_dark.png"
          />
        </Link>

        <div className="flex items-center flex-grow justify-center">
          <nav className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                (link.href === "/" && pathname === "/") ||
                (link.href !== "/" &&
                  pathname.startsWith(link.href) &&
                  link.href !== "/blog" &&
                  !pathname.startsWith("/blog/"));

              if (link.label === "Services") {
                const isServicesActive =
                  pathname.startsWith(link.href) ||
                  pathname === "/services" ||
                  servicesMenuOpen;
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
                        onMouseEnter={() =>
                          handleMenuInteraction("services", "enter")
                        }
                        onMouseLeave={() =>
                          handleMenuInteraction("services", "leave")
                        }
                        aria-expanded={servicesMenuOpen}
                      >
                        {link.label}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-screen max-w-none p-0"
                      onMouseEnter={() =>
                        handleMenuInteraction("services", "enter")
                      }
                      onMouseLeave={() =>
                        handleMenuInteraction("services", "leave")
                      }
                      sideOffset={15}
                    >
                      <div className="bg-background shadow-xl rounded-lg border-border">
                        <div className="container mx-auto py-4 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 max-h-[75vh] overflow-y-auto">
                          {Object.entries(servicesBycategories).map(
                            ([categories, services]) => (
                              <div key={categories}>
                                <h4 className="font-semibold text-base mb-2 flex items-center gap-2 text-primary px-3 py-1">
                                  {React.createElement(
                                    categoriesIcons[categories] || Layers,
                                    { className: "h-5 w-5" }
                                  )}
                                  {categories}
                                </h4>
                                <ul className="space-y-1">
                                  {services.map((service) => (
                                    <li key={service.slug} className="group">
                                      <Link
                                        href={`/services/${service.slug}`}
                                        className={cn(
                                          "block text-sm font-medium rounded-md transition-colors px-3 py-1.5 text-foreground/80 hover:text-white"
                                        )}
                                        onClick={() =>
                                          setServicesMenuOpen(false)
                                        }
                                      >
                                        {service.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )
                          )}
                        </div>
                        <div className="container mx-auto py-3 px-6 mt-2 border-t border-border/40">
                          <Link
                            href="/services"
                            className="flex items-center justify-center text-sm font-semibold text-primary hover:underline"
                            onClick={() => setServicesMenuOpen(false)}
                          >
                            View All Services{" "}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }
              if (link.label === "Company") {
                const companyActive =
                  isCompanyLinkActive(pathname) || companyMenuOpen;
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
                        onMouseEnter={() =>
                          handleMenuInteraction("company", "enter")
                        }
                        onMouseLeave={() =>
                          handleMenuInteraction("company", "leave")
                        }
                        aria-expanded={companyMenuOpen}
                      >
                        {link.label}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-96 p-2 bg-background shadow-xl rounded-lg border-border"
                      onMouseEnter={() =>
                        handleMenuInteraction("company", "enter")
                      }
                      onMouseLeave={() =>
                        handleMenuInteraction("company", "leave")
                      }
                      sideOffset={15}
                    >
                      {COMPANY_SUB_LINKS.map((subLink) => (
                        <DropdownMenuItem
                          key={subLink.label}
                          asChild
                          className="p-0 rounded-md hover:bg-muted/30 focus:bg-muted/30"
                        >
                          <Link
                            href={subLink.href}
                            onClick={() => setCompanyMenuOpen(false)}
                            className={cn(
                              "block w-full text-left px-3 py-2.5 text-sm transition-colors flex items-start gap-3",
                              (pathname === subLink.href ||
                                pathname.startsWith(subLink.href + "/")) &&
                                "font-semibold"
                            )}
                          >
                            {subLink.icon && (
                              <subLink.icon className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                            )}
                            <div>
                              <span className="font-medium text-primary">
                                {subLink.label}
                              </span>
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
                const isProductsActive =
                  pathname.startsWith(link.href) ||
                  pathname === "/products" ||
                  productsMenuOpen;
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
                        onMouseEnter={() =>
                          handleMenuInteraction("products", "enter")
                        }
                        onMouseLeave={() =>
                          handleMenuInteraction("products", "leave")
                        }
                        aria-expanded={productsMenuOpen}
                      >
                        {link.label}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-screen max-w-none p-0"
                      onMouseEnter={() =>
                        handleMenuInteraction("products", "enter")
                      }
                      onMouseLeave={() =>
                        handleMenuInteraction("products", "leave")
                      }
                      sideOffset={15}
                    >
                      <div className="bg-background shadow-xl rounded-lg border-border">
                        <div className="container mx-auto py-6 px-6 grid lg:grid-cols-4 gap-x-8 gap-y-6 max-h-[80vh] overflow-y-auto">
                          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
                            {PRODUCT_SUB_LINKS.map((subLink) => (
                              <div
                                key={subLink.label}
                                className="p-0 rounded-md hover:bg-muted/30 focus-within:bg-muted/30"
                              >
                                <Link
                                  href={subLink.href}
                                  onClick={() => setProductsMenuOpen(false)}
                                  className={cn(
                                    "block w-full h-full text-left px-3 py-2.5 text-sm transition-colors flex items-start gap-3 rounded-md",
                                    pathname === subLink.href && "font-semibold"
                                  )}
                                >
                                  {subLink.icon && (
                                    <subLink.icon className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                                  )}
                                  <div className="flex-1">
                                    <span className="font-medium text-primary">
                                      {subLink.label}
                                    </span>
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
                            <Link
                              href="/contact?demo=true"
                              className="block p-6 rounded-xl shadow-lg bg-gradient-to-br from-primary to-accent text-white hover:shadow-xl transition-shadow duration-300 group"
                            >
                              <h3 className="text-lg font-semibold mb-1 flex items-center">
                                <CalendarPlus className="mr-2 h-5 w-5" /> Book a
                                Demo
                              </h3>
                              <p className="text-sm opacity-90 mb-3">
                                See our projects in action. Schedule a
                                personalized demonstration.
                              </p>
                              <span className="inline-flex items-center text-sm font-medium group-hover:underline">
                                Request Now{" "}
                                <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </Link>
                            <Link
                              href="/contact?partner=true"
                              className="block p-6 rounded-xl shadow-lg bg-gradient-to-br from-accent to-primary text-white hover:shadow-xl transition-shadow duration-300 group"
                            >
                              <h3 className="text-lg font-semibold mb-1 flex items-center">
                                <Handshake className="mr-2 h-5 w-5" /> Partner
                                With Us
                              </h3>
                              <p className="text-sm opacity-90 mb-3">
                                Explore opportunities to collaborate and grow
                                together.
                              </p>
                              <span className="inline-flex items-center text-sm font-medium group-hover:underline">
                                Learn More{" "}
                                <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
                const resourcesActive =
                  isResourcesLinkActive(pathname) || resourcesMenuOpen;
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
                        onMouseEnter={() =>
                          handleMenuInteraction("resources", "enter")
                        }
                        onMouseLeave={() =>
                          handleMenuInteraction("resources", "leave")
                        }
                        aria-expanded={resourcesMenuOpen}
                      >
                        {link.label}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-[400px] p-2 bg-background shadow-xl rounded-lg border-border max-h-[75vh] overflow-y-auto"
                      onMouseEnter={() =>
                        handleMenuInteraction("resources", "enter")
                      }
                      onMouseLeave={() =>
                        handleMenuInteraction("resources", "leave")
                      }
                      sideOffset={15}
                    >
                      {RESOURCES_SUB_LINKS.map((subLink) => (
                        <DropdownMenuItem
                          key={subLink.label}
                          asChild
                          className="p-0 rounded-md hover:bg-muted/30 focus:bg-muted/30"
                        >
                          <Link
                            href={subLink.href}
                            onClick={() => setResourcesMenuOpen(false)}
                            className={cn(
                              "block w-full text-left px-3 py-2.5 text-sm transition-colors flex items-start gap-3",
                              (pathname === subLink.href ||
                                (subLink.href !== "#" &&
                                  pathname.startsWith(subLink.href + "/"))) &&
                                "font-semibold"
                            )}
                          >
                            {subLink.icon && (
                              <subLink.icon className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                            )}
                            <div>
                              <span className="font-medium text-primary">
                                {subLink.label}
                              </span>
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
          <Button
            asChild
            className="rounded-full group bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Link href="/contact">
              Talk to Us
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200 ease-in-out" />
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-4 ml-4">
          {loading ? null : user ? (
            // Avatar with dropdown for user
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  className="w-10 h-10 rounded-2xl border border-primary bg-primary text-primary-foreground flex items-center justify-center font-bold cursor-pointer select-none transition-colors hover:bg-primary/90"
                  style={{ minWidth: 40, minHeight: 40 }} // Ensures square
                  title={user.name || user.email}
                >
                  {(user.name?.[0] || user.email?.[0] || "U").toUpperCase()}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2">
                <div className="px-3 py-2 border-b border-border mb-2">
                  <div className="font-semibold text-base">
                    {user.name || "No Name"}
                  </div>
                  <div className="text-xs text-muted-foreground break-all">
                    {user.email}
                  </div>
                </div>
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    router.push("/login"); // Redirect to login after logout
                  }}
                  className="text-red-600 font-semibold cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => setIsSheetOpen(true)}>Login</Button>
          )}
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[300px] p-0 bg-background text-foreground"
            >
              <SheetHeader className="p-4 border-b border-border">
                <SheetTitle className="flex items-center gap-2">
                  <Image
                    src="/codecafe_logo_dark.png"
                    alt={`${SITE_NAME} Logo (Dark Mode)`}
                    width={140}
                    height={35}
                    data-ai-hint="company logo dark"
                    key="sheet-logo"
                  />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-1 p-4">
                {NAV_LINKS.map((link) => {
                  const isActive =
                    (link.href === "/" && pathname === "/") ||
                    (link.href !== "/" &&
                      pathname.startsWith(link.href) &&
                      link.href !== "/blog" &&
                      !pathname.startsWith("/blog/"));
                  if (link.label === "Services") {
                    const isServicesActive =
                      pathname.startsWith(link.href) ||
                      pathname === "/services";
                    return (
                      <Accordion
                        type="single"
                        collapsible
                        key={link.href}
                        className="w-full"
                      >
                        <AccordionItem
                          value="services-main"
                          className="border-b-0"
                        >
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
                              {Object.entries(servicesBycategories).map(
                                ([categories, services]) => (
                                  <AccordionItem
                                    value={categories}
                                    key={categories}
                                    className="border-b-0"
                                  >
                                    <AccordionTrigger
                                      className={cn(
                                        "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium transition-colors no-underline [&[data-state=open]]:text-primary focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
                                        "text-foreground/80 hover:text-white"
                                      )}
                                    >
                                      <div className="flex items-center gap-2">
                                        {React.createElement(
                                          categoriesIcons[categories] || Layers,
                                          { className: "h-4 w-4" }
                                        )}
                                        {categories}
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-1 pb-0 pl-3 space-y-0.5">
                                      {services.map((service) => (
                                        <div
                                          key={service.slug}
                                          className="py-1"
                                        >
                                          <Link
                                            href={`/services/${service.slug}`}
                                            onClick={closeSheet}
                                            className={cn(
                                              "block w-full text-left text-sm rounded-md transition-colors group focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
                                              pathname ===
                                                `/services/${service.slug}`
                                                ? "text-primary font-semibold"
                                                : "text-foreground/80 hover:text-white"
                                            )}
                                          >
                                            {service.title}
                                          </Link>
                                        </div>
                                      ))}
                                    </AccordionContent>
                                  </AccordionItem>
                                )
                              )}
                            </Accordion>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    );
                  }
                  if (link.label === "Company") {
                    const companyActive = isCompanyLinkActive(pathname);
                    return (
                      <Accordion
                        type="single"
                        collapsible
                        key={link.href}
                        className="w-full"
                      >
                        <AccordionItem
                          value="company-main"
                          className="border-b-0"
                        >
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
                                key={subLink.label}
                                href={subLink.href}
                                onClick={closeSheet}
                                className={cn(
                                  "block w-full text-left px-3 py-2.5 text-sm rounded-md transition-colors flex items-start gap-3",
                                  (pathname === subLink.href ||
                                    pathname.startsWith(subLink.href + "/")) &&
                                    "font-semibold",
                                  "hover:bg-muted/30 focus:bg-muted/30"
                                )}
                              >
                                {subLink.icon && (
                                  <subLink.icon className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                                )}
                                <div>
                                  <span className="font-medium text-primary">
                                    {subLink.label}
                                  </span>
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
                    const isProductsActive =
                      pathname.startsWith(link.href) ||
                      pathname === "/products";
                    return (
                      <Accordion
                        type="single"
                        collapsible
                        key={link.href}
                        className="w-full"
                      >
                        <AccordionItem
                          value="products-main"
                          className="border-b-0"
                        >
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
                                  pathname === subLink.href && "font-semibold",
                                  "hover:bg-muted/30 focus:bg-muted/30"
                                )}
                              >
                                {subLink.icon && (
                                  <subLink.icon className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                                )}
                                <div className="flex-1">
                                  <span className="font-medium text-primary">
                                    {subLink.label}
                                  </span>
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
                            <div className="mt-4 space-y-3">
                              <Link
                                href="/contact?demo=true"
                                onClick={closeSheet}
                                className="block p-3 rounded-lg shadow-md bg-gradient-to-br from-primary to-accent text-white hover:shadow-lg transition-shadow duration-300 group"
                              >
                                <h4 className="text-sm font-semibold mb-0.5 flex items-center">
                                  <CalendarPlus className="mr-2 h-4 w-4" /> Book
                                  a Demo
                                </h4>
                                <p className="text-xs opacity-90">
                                  See our products in action.
                                </p>
                              </Link>
                              <Link
                                href="/contact?partner=true"
                                onClick={closeSheet}
                                className="block p-3 rounded-lg shadow-md bg-gradient-to-br from-accent to-primary text-white hover:shadow-lg transition-shadow duration-300 group"
                              >
                                <h4 className="text-sm font-semibold mb-0.5 flex items-center">
                                  <Handshake className="mr-2 h-4 w-4" /> Partner
                                  With Us
                                </h4>
                                <p className="text-xs opacity-90">
                                  Explore collaboration opportunities.
                                </p>
                              </Link>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    );
                  }
                  if (link.label === "Resources") {
                    const resourcesActive = isResourcesLinkActive(pathname);
                    return (
                      <Accordion
                        type="single"
                        collapsible
                        key={link.href}
                        className="w-full"
                      >
                        <AccordionItem
                          value="resources-main"
                          className="border-b-0"
                        >
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
                                key={subLink.label}
                                href={subLink.href}
                                onClick={closeSheet}
                                className={cn(
                                  "block w-full text-left px-3 py-2.5 text-sm rounded-md transition-colors flex items-start gap-3",
                                  (pathname === subLink.href ||
                                    (subLink.href !== "#" &&
                                      pathname.startsWith(
                                        subLink.href + "/"
                                      ))) &&
                                    "font-semibold",
                                  "hover:bg-muted/30 focus:bg-muted/30"
                                )}
                              >
                                {subLink.icon && (
                                  <subLink.icon className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                                )}
                                <div>
                                  <span className="font-medium text-primary">
                                    {subLink.label}
                                  </span>
                                  {subLink.description && (
                                    <p className="text-xs text-muted-foreground/80 mt-1 whitespace-normal">
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
                  if (link.label === "Projects") {
                    const isProjectsActive =
                      pathname.startsWith(link.href) ||
                      pathname === "/projects";
                    return (
                      <Accordion
                        type="single"
                        collapsible
                        key={link.href}
                        className="w-full"
                      >
                        <AccordionItem value="projects" className="border-none">
                          <AccordionTrigger
                            className={cn(
                              "py-2 text-sm font-medium transition-colors hover:text-primary focus-visible:ring-0 focus-visible:ring-offset-0 outline-none",
                              isProjectsActive
                                ? "text-primary font-semibold"
                                : "text-foreground/60"
                            )}
                          >
                            {link.label}
                          </AccordionTrigger>
                          <AccordionContent className="pt-2 pb-0">
                            <div className="grid grid-cols-1 gap-2">
                              {PRODUCT_SUB_LINKS.map((subLink) => (
                                <Link
                                  key={subLink.label}
                                  href={subLink.href}
                                  onClick={closeSheet}
                                  className={cn(
                                    "flex items-start gap-3 px-3 py-2 text-sm transition-colors rounded-md hover:bg-muted/30",
                                    pathname === subLink.href &&
                                      "font-semibold bg-muted/30"
                                  )}
                                >
                                  {subLink.icon && (
                                    <subLink.icon className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                                  )}
                                  <div className="flex-1">
                                    <span className="font-medium text-primary">
                                      {subLink.label}
                                    </span>
                                    {subLink.subtitle && (
                                      <p className="text-xs text-muted-foreground/70 -mt-0.5 mb-0.5">
                                        {subLink.subtitle}
                                      </p>
                                    )}
                                    {subLink.description && (
                                      <p className="text-xs text-muted-foreground/80">
                                        {subLink.description}
                                      </p>
                                    )}
                                  </div>
                                </Link>
                              ))}
                            </div>
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
