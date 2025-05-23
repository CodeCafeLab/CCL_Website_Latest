
import type { NavItem, Service, Product, TimelineEvent, BlogPost, BlogCategory } from '@/types';
import { Code, Smartphone, Brain, Cloud, Palette, Briefcase, Newspaper, Users, Bot, HomeIcon, Layers, Building2, HelpCircle, BriefcaseBusiness, FileText, Globe, MessageSquare } from 'lucide-react';

export const SITE_NAME = "CodeCafe Lab";

export const NAV_LINKS: NavItem[] = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/services", label: "Services", icon: Layers }, // Main link for Services
  { href: "/company", label: "Company", icon: Building2 },
  { href: "/products", label: "Products", icon: Smartphone },
  { href: "/ai", label: "AI", icon: Bot },
  { href: "/blog", label: "Resources", icon: FileText }, // Changed from /resources to /blog as per previous step
];

export const SERVICES_DATA: Service[] = [
  {
    title: "Custom Software Development",
    slug: "custom-software-development",
    description: "Tailored software solutions to meet your unique business needs, built with cutting-edge technologies.",
    icon: Code,
    image: "https://placehold.co/600x400/ffc011/000000.png?text=Custom+Software",
    dataAiHint: "custom software",
  },
  {
    title: "Mobile App Development",
    slug: "mobile-app-development",
    description: "Engaging and high-performance mobile applications for iOS and Android platforms.",
    icon: Smartphone,
    image: "https://placehold.co/600x400/008d00/ffffff.png?text=Mobile+App",
    dataAiHint: "mobile app",
  },
  {
    title: "Web App Development",
    slug: "web-app-development",
    description: "Modern and responsive web applications to elevate your online presence and functionality.",
    icon: Globe,
    image: "https://placehold.co/600x400/ffc011/000000.png?text=Web+App",
    dataAiHint: "web application",
  },
  {
    title: "AI & Automation Solutions",
    slug: "ai-automation-solutions",
    description: "Leverage AI and Machine Learning to automate processes, gain insights, and drive innovation.",
    icon: Brain,
    image: "https://placehold.co/600x400/008d00/ffffff.png?text=AI+Automation",
    dataAiHint: "artificial intelligence automation",
  },
  {
    title: "Cloud & DevOps Services",
    slug: "cloud-devops-services",
    description: "Streamline your development lifecycle and scale your infrastructure with our robust Cloud and DevOps solutions.",
    icon: Cloud,
    image: "https://placehold.co/600x400/ffc011/000000.png?text=Cloud+DevOps",
    dataAiHint: "cloud devops",
  },
  {
    title: "UI/UX Design",
    slug: "ui-ux-design",
    description: "Intuitive and visually appealing user interfaces that provide exceptional user experiences.",
    icon: Palette,
    image: "https://placehold.co/600x400/008d00/ffffff.png?text=UI+UX+Design",
    dataAiHint: "ui ux",
  },
  {
    title: "Tech Consultancy",
    slug: "tech-consultancy",
    description: "Expert guidance to navigate complex technology challenges and strategize for digital transformation.",
    icon: MessageSquare, // Using MessageSquare as it's on consultancy page
    image: "https://placehold.co/600x400/ffc011/000000.png?text=Tech+Consultancy",
    dataAiHint: "tech consultation",
  },
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: "1",
    name: "AI Chatbot Pro",
    description: "An intelligent chatbot leveraging NLP to enhance customer interactions.",
    stack: "Python, TensorFlow, React",
    imageUrl: "https://placehold.co/600x400/ffc011/1c1c1c.png?text=Chatbot+Pro",
    dataAiHint: "ai chatbot",
    demoUrl: "#",
  },
  {
    id: "2",
    name: "Analytics Master",
    description: "AI-driven platform for deep data analysis and actionable business insights.",
    stack: "Scala, Spark, Next.js",
    imageUrl: "https://placehold.co/600x400/008d00/ffffff.png?text=Analytics+Master",
    dataAiHint: "data analytics",
    demoUrl: "#",
  },
  {
    id: "3",
    name: "AutoML Suite",
    description: "Automate your machine learning model building and deployment pipelines.",
    stack: "Python, Kubernetes, Flask",
    imageUrl: "https://placehold.co/600x400/ffc011/1c1c1c.png?text=AutoML+Suite",
    dataAiHint: "machine learning",
    demoUrl: "#",
  },
  {
    id: "4",
    name: "ContentGen GPT",
    description: "GPT-powered tool for generating high-quality marketing and sales content.",
    stack: "Node.js, OpenAI API, Vue.js",
    imageUrl: "https://placehold.co/600x400/008d00/ffffff.png?text=ContentGen+GPT",
    dataAiHint: "gpt content",
    demoUrl: "#",
  },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  { year: "2018", title: "Founded", description: "CodeCafe Lab was founded with a vision to blend coffee, code, and creativity." },
  { year: "2019", title: "First AI Product Launch", description: "Launched our pioneering AI-driven analytics platform." },
  { year: "2020", title: "Team Expansion", description: "Grew our team to 20+ passionate innovators and developers." },
  { year: "2021", title: "New Office", description: "Moved into a new, state-of-the-art office space designed for collaboration." },
  { year: "2023", title: "Awarded Top AI Solutions Provider", description: "Recognized for excellence in AI and software development." },
];

export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: "all", name: "All" },
  { id: "ai-ml", name: "AI/ML" },
  { id: "software-development", name: "Software Development" },
  { id: "ui-ux", name: "UI/UX" },
  { id: "devops", name: "DevOps" },
  { id: "company-news", name: "Company News" },
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: "1",
    title: "The Future of AI in Business",
    slug: "future-of-ai-in-business",
    date: "2024-07-15",
    excerpt: "Discover how AI is reshaping industries and what it means for your business.",
    category: "ai-ml",
    imageUrl: "https://placehold.co/600x400/ffc011/1c1c1c.png?text=AI+Future",
    dataAiHint: "artificial intelligence",
    content: "Full blog post content about the future of AI in business...",
    tags: ["AI", "Machine Learning", "Business"],
  },
  {
    id: "2",
    title: "Modern Software Development Practices",
    slug: "modern-software-development",
    date: "2024-07-10",
    excerpt: "An overview of the latest trends and best practices in software development.",
    category: "software-development",
    imageUrl: "https://placehold.co/600x400/008d00/ffffff.png?text=Software+Dev",
    dataAiHint: "software development",
    content: "Full blog post content about modern software development practices...",
    tags: ["Agile", "DevOps", "Microservices"],
  },
  {
    id: "3",
    title: "Crafting Delightful User Experiences",
    slug: "crafting-delightful-ux",
    date: "2024-07-05",
    excerpt: "Tips and tricks for designing user interfaces that users love.",
    category: "ui-ux",
    imageUrl: "https://placehold.co/600x400/ffc011/1c1c1c.png?text=UX+Design",
    dataAiHint: "ui design",
    content: "Full blog post content about crafting delightful user experiences...",
    tags: ["UX", "UI Design", "User Research"],
  },
  {
    id: "4",
    title: "CodeCafe Lab's Journey in AI",
    slug: "codecafe-lab-ai-journey",
    date: "2024-06-28",
    excerpt: "A look back at our milestones and innovations in the AI space.",
    category: "company-news",
    imageUrl: "https://placehold.co/600x400/008d00/ffffff.png?text=Company+AI",
    dataAiHint: "company journey",
    content: "Full blog post content about CodeCafe Lab's journey in AI...",
    tags: ["CodeCafe Lab", "AI Innovation", "Company Story"],
  },
];

