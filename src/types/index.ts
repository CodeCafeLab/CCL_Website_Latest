
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  href: string;
  label: string;
  icon?: LucideIcon;
  description?: string; // Added for company submenu descriptions
}

export interface SubService {
  title: string;
  slug: string; // e.g., "ui-ux-design"
  description?: string; // Short descriptive line for the sub-service
}

export interface ServiceMenuItem {
  title: string;
  slug: string; // e.g., "ideation-design"
  icon: LucideIcon;
  subServices: SubService[];
  description?: string; // Optional: for the main service page if needed
  image?: string; // Optional: for the main service page if needed
  dataAiHint?: string; // Optional: for the main service page if needed
}

export interface Product {
  id: string;
  name: string;
  description: string;
  stack: string;
  imageUrl: string;
  dataAiHint: string;
  demoUrl: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface BlogCategory {
  id: string;
  name: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string; // category id
  imageUrl: string;
  dataAiHint: string;
  content: string; // Markdown or HTML
  tags?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  avatarUrl: string;
  dataAiHint: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  logoUrl: string;
  dataAiHint: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  dataAiHint: string;
  bio?: string;
}

export interface OpenPosition {
  id: string;
  title: string;
  location: string;
  type: string; // Full-time, Part-time, Contract
  description: string;
  applyUrl: string;
}
