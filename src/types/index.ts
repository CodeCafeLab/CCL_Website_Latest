
import type { LucideIcon } from "lucide-react";

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
  id: string;
  title: string;
  slug: string;
  icon: string;
  categories: string;
  image: string;
  dataAiHint: string;
  description: string; // Short description
  detailedDescription: string; // Long description
  technologies: string[];
  pricing: {
    type: "Project-Based" | "Hourly" | "Contact for Quote";
    range: string;
  };
}

export interface Product {
  id: number | string;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  price: string;
  discount_price: string;
  image_url: string;
  gallery: string[];
  stock: number;
  sku: string;
  brand: string;
  category: string;
  tags: string[];
  status: string;
  is_featured: number;
  weight: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  meta_title: string;
  meta_description: string;
  created_at: string;
  updated_at: string;
  // Legacy fields for backward compatibility
  stack?: string;
  dataAiHint?: string;
  demoUrl?: string;
}

export interface Partner {
  id: string;
  fullName: string;
  full_name?: string; // from backend
  company: string;
  email: string;
  phone: string;
  cityCountry: string;
  city_country?: string; // from backend
  website: string;
  areaOfInterest: string[] | string;
  area_of_interest?: string[] | string; // from backend
  productsOfInterest: string[] | string;
  products_of_interest?: string[] | string; // from backend
  collaborationPlan: string;
  collaboration_plan?: string; // from backend
  portfolioUrl?: string;
  portfolio_url?: string; // from backend
  portfolio?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  created_at?: string; // from backend
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

export interface Blogcategories {
  id: string;
  name: string;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  status: "published" | "draft";
  categories: string[];
  tags: string[];
  read_time: string;
  createdAt: string;
  views: number;
  thumbnail?: string;
  featured: boolean;
  summary: string;
  content: string;
  coverImage: string;
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

export interface categories {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  created_at?: string;
}

export function mapBackendBlogToFrontend(blog: any): BlogPost {
  return {
    ...blog,
    imageUrl: blog.coverImage,
    date: blog.createdAt,
    excerpt: blog.summary,
    // ...other mappings
  };
}
