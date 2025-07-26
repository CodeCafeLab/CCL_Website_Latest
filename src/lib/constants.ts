
import type {
  NavItem,
  ServiceMenuItem,
  Product,
  TimelineEvent,
  BlogPost,
  Blogcategories,
  ProductSubMenuItem,
  TechStackItem,
  Testimonial,
  FeaturedVideo,
  OpenPosition,
  YouTubeShort,
} from "@/types";
import {
  Code,
  Smartphone,
  Brain,
  Cloud,
  Palette,
  Users,
  Bot,
  HomeIcon,
  Layers,
  Building2,
  FileText,
  FileCode,
  Lightbulb,
  MessageCircle,
  ShieldCheck,
  PenTool,
  Server,
  Cpu,
  Gem,
  GitBranch,
  DatabaseZap,
  BarChartBig,
  Info,
  Briefcase,
  Mail,
  Globe,
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
  Home,
  School,
  ChefHat,
  MessageSquare as MessageSquareIcon,
  Wrench,
  Truck,
  MonitorSmartphone,
  BarChart3,
  CircleDollarSign,
  Users2,
  Award,
  Handshake,
  CalendarPlus,
  DownloadCloud,
  Newspaper,
  CalendarClock,
  HelpCircle,
  BookOpenText,
  MailPlus,
  BarChartHorizontalBig,
  PlayCircle,
  Container,
  Share,
  Database,
  Settings2,
  Network,
  ServerCog,
  Shield,
  AppWindow,
  CodeXml,
  Cable,
  FileJson,
  TerminalSquare,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Send,
  Instagram,
  Film,
  Search,
  Rocket,
  UploadCloud,
  Share2,
} from "lucide-react";

export const SITE_NAME = "CodeCafe Lab";

export const NAV_LINKS: NavItem[] = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/ai", label: "AI", icon: Bot },
  { href: "/services", label: "Services", icon: Layers },
  { href: "/projects", label: "Projects", icon: Smartphone },
  { href: "/company", label: "Company", icon: Building2 },
  { href: "/blog", label: "Resources", icon: FileText },
  // Add here if you want any as top-level
  // { href: "/why-choose-us", label: "Why Choose Us", icon: Award },
];

export const COMPANY_SUB_LINKS: NavItem[] = [
  {
    href: "/company",
    label: "About CodeCafe Lab",
    icon: Info,
    description:
      "Company mission, vision, values, founding story, leadership team, and journey.",
  },
  {
    href: "/pricing",
    label: "Pricing",
    icon: CircleDollarSign,
    description:
      "We have transparent pricing modules for individuals, Startups, Companies.",
  },
  {
    href: "/consultancy",
    label: "Consultancy",
    icon: Briefcase,
    description: "We provide consultancy for recruitment also",
  },
  {
    href: "/contact",
    label: "Contact Us",
    icon: Mail,
    description:
      "Contact form, phone, email, office locations, Google Maps embed, and social links.",
  },
  {
    href: "/career",
    label: "Career",
    icon: Briefcase,
    description:
      "Current job openings, work culture, benefits, hiring process, and intern programs.",
  },
  {
    href: "/teams",
    label: "Our Team",
    icon: Users2,
    description:
      "Photos, bios, and roles of key team members (adds a human touch).",
  },
  {
    href: "/why-choose-us",
    label: "Why Choose Us",
    icon: Award,
    description:
      "Key differentiators, client success stories, testimonials, and USPs.",
  },
  {
    href: "#",
    label: "Partners & Affiliations",
    icon: Handshake,
    description: "Tech alliances, certifications, and strategic partners.",
  },
];

export const PRODUCT_SUB_LINKS: ProductSubMenuItem[] = [
  {
    label: "Trackzy",
    subtitle: "(CCL Time Tracker)",
    description: "Smart time tracking for productive teams.",
    href: "#",
    icon: Clock,
  },
  {
    label: "AutoCleanse",
    subtitle: "(Doorstep Car Cleaning Service)",
    description: "Doorstep car wash, zero hassle.",
    href: "#",
    icon: Car,
  },
  {
    label: "QConnect",
    subtitle: "(Scan & Connect)",
    description: "Scan the QR. Connect instantly.",
    href: "#",
    icon: QrCode,
  },
  {
    label: "SwiftDrop",
    subtitle: "(Parcel Delivery #1)",
    description: "Next-gen parcel delivery at your command.",
    href: "#",
    icon: Package,
  },
  {
    label: "Neighbory",
    subtitle: "(Society Management)",
    description: "Simplifying society and community living.",
    href: "#",
    icon: HomeIcon,
  },
  {
    label: "ClientNest",
    subtitle: "(CRM)",
    description: "CRM that grows with your business.",
    href: "#",
    icon: Briefcase,
  },
  {
    label: "EduFlow",
    subtitle: "(School Management)",
    description: "Everything your school needs, in one place.",
    href: "#",
    icon: School,
  },
  {
    label: "DineOS",
    subtitle: "(Restra)",
    description: "Modern software for modern restaurants.",
    href: "#",
    icon: ChefHat,
  },
  {
    label: "WizZap",
    subtitle: "(WhatsApp Automation)",
    description: "Automated WhatsApp messaging for smart outreach.",
    href: "#",
    icon: MessageSquareIcon,
  },
  {
    label: "TeamSage",
    subtitle: "(HRMS)",
    description: "Smart HRMS for growing teams.",
    href: "#",
    icon: Users,
  },
  {
    label: "Servion",
    subtitle: "(On-demand Service App)",
    description: "On-demand services, reimagined.",
    href: "#",
    icon: Wrench,
  },
  {
    label: "DropChain",
    subtitle: "(Parcel Delivery #2)",
    description: "Reliable parcel logistics powered by smart tech.",
    href: "#",
    icon: Package,
  },
  {
    label: "Fleetzy",
    subtitle: "(Fleet Management)",
    description: "Fleet tracking and logistics, simplified.",
    href: "#",
    icon: Truck,
  },
  {
    label: "InstaSite",
    subtitle: "(Miniweb)",
    description: "Launch stunning mini websites in minutes.",
    href: "#",
    icon: MonitorSmartphone,
  },
  {
    label: "XpressRoute",
    subtitle: "(Parcel Delivery #3)",
    description: "Speed up your delivery, the smart way.",
    href: "#",
    icon: Package,
  },
  {
    label: "Pulselytics",
    subtitle: "(Social Media Data Dashboard)",
    description: "Real-time analytics for your social presence.",
    href: "#",
    icon: BarChart3,
  },
];

export const RESOURCES_SUB_LINKS: NavItem[] = [
  {
    href: "/blog",
    label: "Blog",
    icon: FileText,
    description:
      "Articles on tech trends, case studies, coding tips, AI advancements, and startup advice.",
  },
  {
    href: "/case-studies",
    label: "Case Studies",
    icon: BarChartHorizontalBig,
    description:
      "Real client success stories with challenges, solutions, results, and testimonials.",
  },
  {
    href: "/whitepapers",
    label: "Whitepapers",
    icon: DownloadCloud,
    description:
      "Downloadable PDFs on industry insights, AI, blockchain, or software strategy.",
  },
  {
    href: "/reports",
    label: "Reports",
    icon: BarChartBig,
    description:
      "Industry and company reports, research, and analytics.",
  },
  {
    href: "/news",
    label: "News & Announcements",
    icon: Newspaper,
    description:
      "Product launches, event participation, partnerships, awards, or media mentions.",
  },
  {
    href: "/assignments",
    label: "Assignments",
    icon: FileCode,
    description:
      "Technical and business assignments, challenges, and tasks.",
  },
  {
    href: "/webinars",
    label: "Webinars & Events",
    icon: CalendarClock,
    description:
      "Upcoming webinars, past recordings, tech meetups, or training events.",
  },
  {
    href: "/help",
    label: "Help Center / FAQs",
    icon: HelpCircle,
    description:
      "Support articles, onboarding guides, and general help topics.",
  },
  {
    href: "/tutorials",
    label: "Tutorials & How-Tos",
    icon: BookOpenText,
    description:
      "Technical tutorials, integrations, and walkthroughs for developers and clients.",
  },
  {
    href: "/newsletters",
    label: "Newsletter Archive",
    icon: MailPlus,
    description:
      "A place to collect and view our monthly newsletters on company updates and tech trends.",
  },
   {
    href: "/import",
    label: "Bulk Import",
    icon: UploadCloud,
    description:
      "Upload data in bulk from a CSV file for various content types.",
  },
  {
    href: "/social-automation",
    label: "Social Automation",
    icon: Share2,
    description:
      "Use AI to generate tailored posts for different social media platforms.",
  },
];

export const SERVICES_DATA: ServiceMenuItem[] = [
  {
    id: "1",
    title: "Web Development",
    slug: "web-development",
    icon: "Globe",
    categories: "Development",
    image: "/undraw_web-development_0wdh.svg",
    dataAiHint: "web development code",
    description:
      "Crafting dynamic, responsive websites and powerful web applications tailored to your business needs.",
    detailedDescription:
      "Our web development services cover the full spectrum of creating a powerful online presence. From stunning, responsive marketing websites that capture your brand's essence to complex, data-driven web applications that streamline your operations, we build solutions that are scalable, secure, and user-friendly. We focus on modern, efficient technology stacks to deliver high-performance web experiences.",
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Firebase",
    ],
    pricing: {
      type: "Project-Based",
      range: "$2,000 - $25,000+",
    },
  },
  {
    id: "2",
    title: "Mobile App Development",
    slug: "mobile-app-development",
    icon: "Smartphone",
    categories: "Development",
    image: "/undraw_design_ewba.svg",
    dataAiHint: "mobile app ui",
    description:
      "Building high-performance, scalable native and cross-platform mobile applications for iOS and Android.",
    detailedDescription:
      "We specialize in creating intuitive and high-performance mobile applications for both iOS and Android platforms. Whether you need a native app for maximum performance or a cross-platform solution for wider reach and efficiency, our team has the expertise. We guide you from ideation and UI/UX design to development, testing, and App Store launch, ensuring your app meets both user expectations and business goals.",
    technologies: ["React Native", "Swift", "Kotlin", "Firebase", "REST APIs"],
    pricing: {
      type: "Project-Based",
      range: "$5,000 - $50,000+",
    },
  },
  {
    id: "3",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    icon: "Palette",
    categories: "Design",
    image: "/undraw_design_ewba.svg",
    dataAiHint: "ux wireframe",
    description:
      "Creating intuitive, engaging, and aesthetically pleasing user interfaces and experiences.",
    detailedDescription:
      "Good design is about more than just aesthetics; it's about creating a seamless and intuitive journey for your users. Our UI/UX design process is rooted in deep user research and a clear understanding of your business objectives. We create wireframes, interactive prototypes, and pixel-perfect visual designs that are not only beautiful but also functional and user-friendly, leading to higher engagement and conversion rates.",
    technologies: [
      "Figma",
      "Adobe XD",
      "User Research",
      "Prototyping",
      "Usability Testing",
    ],
    pricing: {
      type: "Hourly",
      range: "$50 - $90 per hour",
    },
  },
  {
    id: "4",
    title: "SEO Services",
    slug: "seo-services",
    icon: "Search",
    categories: "Marketing",
    image: "/undraw_search-engines_k649.svg",
    dataAiHint: "seo analytics",
    description:
      "Boosting your online visibility and driving organic traffic with strategic SEO implementation.",
    detailedDescription:
      "Unlock your website's potential with our comprehensive SEO services. We go beyond basic keywords to develop a holistic strategy that includes technical SEO, on-page optimization, content strategy, and quality link building. Our goal is to improve your search engine rankings, drive relevant organic traffic, and increase your online authority, resulting in sustainable, long-term growth.",
    technologies: [
      "Google Analytics",
      "SEMrush",
      "Ahrefs",
      "Keyword Research",
      "Content Strategy",
    ],
    pricing: {
      type: "Contact for Quote",
      range: "Custom packages available",
    },
  },
  {
    id: "5",
    title: "Cloud & DevOps",
    slug: "cloud-devops",
    icon: "Cloud",
    categories: "Infrastructure",
    image: "/undraw_server-status_f685.svg",
    dataAiHint: "cloud infrastructure",
    description:
      "Streamlining development and scaling your infrastructure with robust cloud and DevOps solutions.",
    detailedDescription:
      "We help you leverage the power of the cloud to build a scalable, resilient, and efficient infrastructure. Our DevOps services automate your development pipeline, enabling faster and more reliable software releases. From cloud migration and infrastructure-as-code to setting up CI/CD pipelines and monitoring, we provide the foundation for modern, agile development.",
    technologies: [
      "AWS",
      "Google Cloud",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Jenkins",
    ],
    pricing: {
      type: "Contact for Quote",
      range: "Retainers and project-based",
    },
  },
];


export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "2018",
    title: "Founded",
    description:
      "CodeCafe Lab was founded with a vision to blend coffee, code, and creativity.",
  },
  {
    year: "2019",
    title: "First AI Product Launch",
    description: "Launched our pioneering AI-driven analytics platform.",
  },
  {
    year: "2020",
    title: "Team Expansion",
    description: "Grew our team to 20+ passionate innovators and developers.",
  },
  {
    year: "2021",
    title: "New Office",
    description:
      "Moved into a new, state-of-the-art office space designed for collaboration.",
  },
  {
    year: "2023",
    title: "Awarded Top AI Solutions Provider",
    description: "Recognized for excellence in AI and software development.",
  },
];

export const BLOG_CATEGORIES: Blogcategories[] = [
  { id: "all", name: "All" },
  { id: "ai-ml", name: "AI/ML" },
  { id: "software-development", name: "Software Development" },
  { id: "ui-ux", name: "UI/UX" },
  { id: "devops", name: "DevOps" },
  { id: "company-news", name: "Company News" },
  { id: "blockchain", name: "Blockchain" },
  { id: "case-studies", name: "Case Studies" },
  { id: "tutorials", name: "Tutorials" },
];

export const BLOG_POSTS_DATA = [
  {
    id: "1",
    title: "The Future of AI in Business",
    slug: "future-of-ai-in-business",
    date: "2024-07-15",
    excerpt:
      "Discover how AI is reshaping industries and what it means for your business.",
    categories: "ai-ml",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "ai future",
    content: "Full blog post content about the future of AI in business...",
    tags: ["AI", "Machine Learning", "Business"],
  },
  {
    id: "2",
    title: "Modern Software Development Practices",
    slug: "modern-software-development",
    date: "2024-07-10",
    excerpt:
      "An overview of the latest trends and best practices in software development.",
    categories: "software-development",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "developer coding",
    content:
      "Full blog post content about modern software development practices...",
    tags: ["Agile", "DevOps", "Microservices"],
  },
  {
    id: "3",
    title: "Crafting Delightful User Experiences",
    slug: "crafting-delightful-ux",
    date: "2024-07-05",
    excerpt: "Tips and tricks for designing user interfaces that users love.",
    categories: "ui-ux",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "ux design",
    content:
      "Full blog post content about crafting delightful user experiences...",
    tags: ["UX", "UI Design", "User Research"],
  },
  {
    id: "4",
    title: "CodeCafe Lab's Journey in AI",
    slug: "codecafe-lab-ai-journey",
    date: "2024-06-28",
    excerpt: "A look back at our milestones and innovations in the AI space.",
    categories: "company-news",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "startup meeting",
    content: "Full blog post content about CodeCafe Lab's journey in AI...",
    tags: ["CodeCafe Lab", "AI Innovation", "Company Story"],
  },
  {
    id: "5",
    title: "Deep Dive into DeFi Development",
    slug: "deep-dive-defi-development",
    date: "2024-08-01",
    excerpt:
      "Exploring the core concepts and challenges of building Decentralized Finance applications.",
    categories: "blockchain",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "blockchain network",
    content: "Full blog post content about DeFi development...",
    tags: ["DeFi", "Blockchain", "Smart Contracts", "Ethereum"],
  },
  {
    id: "6",
    title: "Case Study: AI-Powered Logistics Optimization",
    slug: "case-study-ai-logistics",
    date: "2024-08-05",
    excerpt:
      "How CodeCafe Lab helped a major logistics firm reduce costs and improve efficiency using AI.",
    categories: "case-studies",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "logistics optimization",
    content: "Detailed case study on AI in logistics...",
    tags: ["AI", "Case Study", "Logistics", "Optimization", "Machine Learning"],
  },
  {
    id: "7",
    title: "Getting Started with Next.js: A Beginner's Tutorial",
    slug: "nextjs-beginners-tutorial",
    date: "2024-08-10",
    excerpt:
      "A step-by-step guide to building your first web application with Next.js.",
    categories: "tutorials",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "programming tutorial",
    content: "Comprehensive tutorial on Next.js for beginners...",
    tags: ["Next.js", "React", "Web Development", "Tutorial", "JavaScript"],
  },
];

export const FEATURED_VIDEOS_DATA: FeaturedVideo[] = [
  {
    id: "video1",
    title: "Intro to Our AI Platform",
    thumbnailUrl: "/video1s.png",
    videoSrc: "/video1.mp4",
    dataAiHint: "ai dashboard",
    duration: "0:45",
  },
  {
    id: "video2",
    title: "Web Dev Best Practices",
    thumbnailUrl: "/video2s.png",
    videoSrc: "/video2.mp4",
    dataAiHint: "web development",
    duration: "1:10",
  },
  {
    id: "video3",
    title: "A Day at CodeCafe Lab",
    thumbnailUrl: "/video3s.png",
    videoSrc: "/video3.mp4",
    dataAiHint: "creative office",
    duration: "0:55",
  },
];

export const INSTAGRAM_REELS_DATA: FeaturedVideo[] = [
  {
    id: "reel1",
    title: "Quick Tip: CSS Flexbox",
    thumbnailUrl: "https://placehold.co/224x398.png",
    videoSrc: "/video1.mp4",
    dataAiHint: "css code tip",
    duration: "0:30",
    instagramUrl: "https://www.instagram.com/reel/C0j4x9yP1aB/",
  },
  {
    id: "reel2",
    title: "Behind the Scenes: Project Launch",
    thumbnailUrl: "https://placehold.co/224x398.png",
    videoSrc: "/video2.mp4",
    dataAiHint: "team celebration",
    duration: "0:58",
    instagramUrl: "https://www.instagram.com/reel/C2s8v9yv0bK/",
  },
  {
    id: "reel3",
    title: "Meet Our New Intern!",
    thumbnailUrl: "https://placehold.co/224x398.png",
    videoSrc: "/video3.mp4",
    dataAiHint: "office introduction",
    duration: "0:42",
    instagramUrl: "https://www.instagram.com/reel/C3x7a8bM9c7/",
  },
  {
    id: "reel4",
    title: "Our Favorite Productivity Hacks",
    thumbnailUrl: "https://placehold.co/224x398.png",
    videoSrc: "/video1.mp4",
    dataAiHint: "productivity workspace",
    duration: "0:55",
    instagramUrl: "https://www.instagram.com/reel/C3x7a8bM9c7/",
  },
];

export const TECH_STACK_DATA: TechStackItem[] = [
  { name: "Next.js", icon: Package },
  { name: "React", icon: Package },
  { name: "TypeScript", icon: FileCode },
  { name: "Node.js", icon: Server },
  { name: "Python", icon: FileCode },
  { name: "AI / ML", icon: Brain },
  { name: "Genkit", icon: Settings2 },
  { name: "Tailwind CSS", icon: Palette },
  { name: "Firebase", icon: Cloud },
  { name: "Google Cloud", icon: Cloud },
  { name: "AWS", icon: Cloud },
  { name: "Docker", icon: Container },
  { name: "Kubernetes", icon: Share },
  { name: "PostgreSQL", icon: Database },
  { name: "MongoDB", icon: DatabaseZap },
  { name: "Git", icon: GitMerge },
  { name: "Figma", icon: PenTool },
  { name: "Android", icon: Smartphone },
  { name: "iOS", icon: Smartphone },
  { name: "Java", icon: FileCode },
  { name: "Kotlin", icon: FileCode },
  { name: "Swift", icon: FileCode },
  { name: "TensorFlow", icon: Cpu },
  { name: "PyTorch", icon: Cpu },
  { name: "HTML5", icon: CodeXml },
  { name: "CSS3", icon: Palette },
  { name: "JavaScript", icon: FileCode },
  { name: "REST APIs", icon: Cable },
  { name: "GraphQL", icon: FileJson },
  { name: "DevOps", icon: TerminalSquare },
  { name: "CI/CD", icon: ServerCog },
  { name: "Cybersecurity", icon: Shield },
  { name: "WebSockets", icon: Network },
  { name: "Microservices", icon: LayoutGrid },
  { name: "Headless CMS", icon: AppWindow },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Miller",
    role: "CEO, Innovatech Solutions",
    company: "Innovatech Solutions",
    quote:
      "CodeCafe Lab transformed our vision into a reality with their exceptional AI expertise. Their team is not only skilled but also incredibly responsive and collaborative.",
    avatarUrl: "https://placehold.co/60x60.png",
    dataAiHint: "ceo portrait",
    rating: 5,
  },
  {
    id: "2",
    name: "John Davis",
    role: "CTO, QuantumLeap AI",
    company: "QuantumLeap AI",
    quote:
      "Working with CodeCafe Lab was a game-changer. Their deep understanding of complex algorithms and commitment to quality is unmatched.",
    avatarUrl: "https://placehold.co/60x60.png",
    dataAiHint: "cto headshot",
    rating: 5,
  },
  {
    id: "3",
    name: "Emily Carter",
    role: "Product Manager, NextGen Apps",
    company: "NextGen Apps",
    quote:
      "The mobile app developed by CodeCafe Lab exceeded all our expectations in terms of design, functionality, and performance. Highly recommended!",
    avatarUrl: "https://placehold.co/60x60.png",
    dataAiHint: "product manager",
    rating: 4,
  },
  {
    id: "4",
    name: "Michael Brown",
    role: "Founder, SparkUp Ventures",
    company: "SparkUp Ventures",
    quote:
      "As a startup, we needed a tech partner who was agile and innovative. CodeCafe Lab delivered on all fronts, helping us launch successfully.",
    avatarUrl: "https://placehold.co/60x60.png",
    dataAiHint: "startup founder",
    rating: 5,
  },
  {
    id: "5",
    name: "Jessica Williams",
    role: "Head of Digital, ConnectFlow",
    company: "ConnectFlow Dynamics",
    quote:
      "Their team's dedication and problem-solving skills are top-notch. CodeCafe Lab is our go-to for any complex software development needs.",
    avatarUrl: "https://placehold.co/60x60.png",
    dataAiHint: "digital manager",
    rating: 4,
  },
];



