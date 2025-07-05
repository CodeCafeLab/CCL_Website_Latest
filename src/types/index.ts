
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
  category: string;
  image: string;
  dataAiHint: string;
  description: string; // Short description
  detailedDescription: string; // Long description
  technologies: string[];
  pricing: {
    type: 'Project-Based' | 'Hourly' | 'Contact for Quote';
    range: string;
  };
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
  rating: number;
}

export interface ClientLogo {
  id:string;
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

export interface FeaturedVideo {
  id: string;
  title: string;
  thumbnailUrl: string; 
  videoSrc: string; // Path to local video in /public
  dataAiHint: string;
  duration?: string;
  instagramUrl?: string; // Keep if any specific reel still uses it, otherwise can be removed
}


export interface TechStackItem {
  name: string;
  icon: LucideIcon;
}

export interface YouTubeShort {
  id: string;
  title: string;
  thumbnailUrl: string;
  youtubeUrl: string;
  dataAiHint: string;
  duration: string;
  durationSeconds: number;
}
