
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  href: string;
  label: string;
  icon?: LucideIcon;
  description?: string; 
}

export interface SubService {
  title: string;
  slug: string; 
  description?: string; 
}

export interface ServiceMenuItem {
  title: string;
  slug: string; 
  icon: LucideIcon;
  subServices: SubService[];
  description?: string; 
  image?: string; 
  dataAiHint?: string; 
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

export interface ProductSubMenuItem {
  href: string;
  label: string;
  subtitle?: string;
  description: string;
  icon?: LucideIcon;
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
  category: string; 
  imageUrl: string;
  dataAiHint: string;
  content: string; 
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
  type: string; 
  description: string;
  applyUrl: string;
}

export interface YouTubeShort {
  id: string;
  title: string;
  thumbnailUrl: string;
  youtubeUrl: string;
  dataAiHint: string;
  duration: string; // e.g., "0:58"
}

export interface YouTubeShortsCategory {
  id: string;
  categoryName: string;
  shorts: YouTubeShort[];
}

export interface TechStackItem {
  name: string;
  icon: LucideIcon;
}
