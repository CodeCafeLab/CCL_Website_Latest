
import type { NavItem, ServiceMenuItem, Product, TimelineEvent, BlogPost, BlogCategory } from '@/types';
import { 
  Code, Smartphone, Brain, Cloud, Palette, Users, Bot, HomeIcon, Layers, Building2, FileText, 
  Lightbulb, MessageCircle, ShieldCheck, PenTool, Server, Cpu, Gem, GitBranch, DatabaseZap, BarChartBig,
  Info, Briefcase, Mail, Globe, GitMerge, LayoutGrid, Puzzle, TrendingUp, Settings
} from 'lucide-react';

export const SITE_NAME = "CodeCafe Lab";

export const NAV_LINKS: NavItem[] = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/services", label: "Services", icon: Layers },
  { href: "/company", label: "Company", icon: Building2 },
  { href: "/products", label: "Products", icon: Smartphone },
  { href: "/ai", label: "AI", icon: Bot },
  { href: "/blog", label: "Resources", icon: FileText },
];

export const COMPANY_SUB_LINKS: NavItem[] = [
  { href: "/company", label: "About CodeCafe Lab", icon: Info },
  { href: "/career", label: "Career", icon: Briefcase },
  { href: "/contact", label: "Contact Us", icon: Mail },
];

export const SERVICES_DATA: ServiceMenuItem[] = [
  {
    title: "Ideation & Design",
    slug: "ideation-design",
    icon: Lightbulb, // Icon for Ideation & Design
    subServices: [
      { title: "UI/UX Design", slug: "ui-ux-design", description: "— Wireframes, prototypes, high-fidelity designs, and usability testing." },
      { title: "Product Roadmap", slug: "product-roadmap", description: "— Planning MVP, scaling strategy, feature prioritization, and timelines." },
      { title: "Design Thinking Workshops", slug: "design-thinking-workshops", description: "— Interactive sessions to identify user pain points and innovation opportunities." },
      { title: "User Research & Personas", slug: "user-research-personas", description: "— Target audience analysis, interviews, persona creation, and behavior mapping." },
      { title: "Brand Identity Design", slug: "brand-identity-design", description: "— Logo, color schemes, typography, and brand guidelines for digital presence." },
      { title: "Information Architecture", slug: "information-architecture", description: "— Sitemap creation, navigation planning, and content hierarchy." },
      { title: "Prototyping & Wireframing", slug: "prototyping-wireframing", description: "— Clickable prototypes and low-fidelity screens to validate ideas quickly." },
      { title: "Competitor Analysis", slug: "competitor-analysis", description: "— Market research and UX/UI comparisons for competitive differentiation." },
    ],
  },
  {
    title: "Mobile App Development",
    slug: "mobile-app-development",
    icon: Smartphone, // Icon for Mobile App Development
    subServices: [
      { title: "Android App Development", slug: "android-app-development", description: "— Native Android apps using Java/Kotlin for performance and scalability." },
      { title: "iOS App Development", slug: "ios-app-development", description: "— Native iPhone/iPad apps built with Swift for Apple ecosystems." },
      { title: "Cross-Platform App Development", slug: "cross-platform-app-development", description: "— Apps using React Native, Flutter, or Xamarin for both iOS and Android." },
      { title: "Progressive Web Apps (PWA)", slug: "progressive-web-apps", description: "— Web apps with native-like experiences for mobile browsers." },
      { title: "Mobile App UI/UX Design", slug: "mobile-app-ui-ux-design", description: "— Custom user interface design and mobile-specific UX strategy." },
      { title: "App Testing & QA", slug: "app-testing-qa", description: "— Functional, performance, and user testing for bug-free launches." },
      { title: "App Deployment & Launch", slug: "app-deployment-launch", description: "— Publishing to Google Play Store & Apple App Store with compliance." },
      { title: "App Maintenance & Support", slug: "app-maintenance-support", description: "— Post-launch updates, monitoring, and feature improvements." },
    ],
  },
  {
    title: "Web Development",
    slug: "web-development",
    icon: Globe, // Icon for Web Development (was Code, changing to Globe for variety)
    subServices: [
      { title: "Website Development", slug: "website-development", description: "— Responsive business websites, portfolios, landing pages, and CMS sites." },
      { title: "Web App Development", slug: "web-app-development", description: "— Custom web applications for internal tools, SaaS, dashboards, and portals." },
      { title: "E-Commerce Development", slug: "e-commerce-development", description: "— Online store setup with WooCommerce, Shopify, or custom-built solutions." },
      { title: "Frontend Development", slug: "frontend-development", description: "— React, Next.js, Vue.js, and modern JavaScript frameworks." },
      { title: "Backend Development", slug: "backend-development", description: "— Node.js, Laravel, Python/Django, and scalable API development." },
      { title: "CMS & Custom Admin Panels", slug: "cms-custom-admin-panels", description: "— WordPress, Strapi, Headless CMSs, or fully custom admin interfaces." },
      { title: "API Integration & Development", slug: "api-integration-development-web", description: "— RESTful APIs, GraphQL, and third-party API integrations." }, // Added -web to slug for uniqueness
      { title: "Performance Optimization", slug: "performance-optimization", description: "— Speed, SEO, accessibility, and Core Web Vitals improvements." },
      { title: "Web Hosting & Deployment", slug: "web-hosting-deployment", description: "— Scalable hosting setup on AWS, Vercel, Netlify, DigitalOcean, etc." },
    ],
  },
  {
    title: "Software Development", // Reordered to match user list (was after AI)
    slug: "software-development",
    icon: Server, // Icon for Software Development
    subServices: [
      { title: "Custom Software Development", slug: "custom-software-development", description: "— Tailored solutions built from scratch to meet unique business needs." },
      { title: "Enterprise Software Development", slug: "enterprise-software-development", description: "— Large-scale software systems for operations, management, or data processing." },
      { title: "SaaS Product Development", slug: "saas-product-development", description: "— Cloud-based, multi-tenant platforms for subscription-based services." },
      { title: "ERP & CRM Solutions", slug: "erp-crm-solutions", description: "— Internal tools for enterprise resource planning and customer relationship management." },
      { title: "Legacy Software Modernization", slug: "legacy-software-modernization", description: "— Rebuilding or upgrading outdated systems using modern technologies." },
      { title: "Desktop Application Development", slug: "desktop-application-development", description: "— Software for Windows, macOS, or Linux platforms." },
      { title: "API Development & Integration", slug: "api-development-integration-software", description: "— Scalable RESTful or GraphQL APIs and third-party service integrations." }, // Added -software to slug
      { title: "Software Testing & QA", slug: "software-testing-qa", description: "— Manual and automated testing for functionality, performance, and security." },
      { title: "Software Maintenance & Support", slug: "software-maintenance-support", description: "— Ongoing upgrades, troubleshooting, and performance monitoring." },
    ],
  },
  {
    title: "AI Development",
    slug: "ai-development",
    icon: Brain, // Icon for AI Development (was Cpu)
    subServices: [
      { title: "AI Consulting", slug: "ai-consulting", description: "— Strategy, feasibility analysis, and roadmap creation for AI implementation." },
      { title: "AI Agent Development", slug: "ai-agent-development", description: "— Autonomous agents for customer support, operations, or task automation." },
      { title: "AI Chatbot Development", slug: "ai-chatbot-development", description: "— Conversational AI bots using GPT, Dialogflow, or Rasa for websites and apps." },
      { title: "Adaptive AI Systems", slug: "adaptive-ai-systems", description: "— Self-learning and behavior-adjusting systems for real-time environments." },
      { title: "Natural Language Processing (NLP)", slug: "natural-language-processing", description: "— Text classification, sentiment analysis, summarization, and language models." },
      { title: "Computer Vision Solutions", slug: "computer-vision-solutions", description: "— Object detection, face recognition, OCR, and visual analytics." },
      { title: "Predictive Analytics", slug: "predictive-analytics", description: "— Forecasting trends and behaviors using AI-based statistical models." },
      { title: "Voice AI & Speech Recognition", slug: "voice-ai-speech-recognition", description: "— Voice-based assistants and speech-to-text systems." },
      { title: "Recommendation Systems", slug: "recommendation-systems", description: "— Personalized content, product, or service suggestions using AI." },
      { title: "AI Model Deployment & MLOps", slug: "ai-model-deployment-mlops", description: "— Scalable AI pipeline management with tools like TensorFlow Serving or SageMaker." },
    ],
  },
  {
    title: "Blockchain Development", // Renamed from "Blockchain Services"
    slug: "blockchain-development",
    icon: GitMerge, // Icon for Blockchain Development (was Gem)
    subServices: [
      { title: "ICO Development", slug: "ico-development", description: "— Launch support for Initial Coin Offerings, including smart contracts and whitepapers." },
      { title: "Smart Contract Development", slug: "smart-contract-development", description: "— Ethereum, BSC, or Polygon-based contracts for DeFi, NFTs, DAOs, etc." },
      { title: "Wallet Development", slug: "wallet-development", description: "— Secure multi-currency crypto wallets for web and mobile (custodial/non-custodial)." },
      { title: "NFT Development", slug: "nft-development", description: "— End-to-end NFT marketplace and token creation services (ERC-721, ERC-1155)." },
      { title: "DeFi Development", slug: "defi-development", description: "— Decentralized finance platforms for lending, staking, yield farming, and exchanges." },
      { title: "Asset Tokenization", slug: "asset-tokenization", description: "— Convert physical/digital assets (e.g., gold, equity) into blockchain-based tokens." },
      { title: "Real Estate Tokenization", slug: "real-estate-tokenization", description: "— Fractional ownership models using smart contracts for property investment." },
      { title: "Blockchain Consulting", slug: "blockchain-consulting", description: "— Use-case evaluation, platform selection, compliance strategy, and architecture." },
      { title: "Private & Consortium Blockchain", slug: "private-consortium-blockchain", description: "— Permissioned blockchain networks for enterprises using Hyperledger or Quorum." },
      { title: "dApp Development", slug: "dapp-development", description: "— Decentralized application design with Web3 integrations and wallet connectivity." },
    ],
  },
];


// For the main /services page, you might want a flat list or a different structure.
// This is the old flat structure, kept for reference or if needed on the services page itself.
// You can choose to remove this or adapt it.
export const ALL_SERVICES_FLAT: ServiceMenuItem[] = [
  {
    title: "UI/UX Design",
    slug: "ui-ux-design",
    icon: Palette,
    subServices: [],
    description: "Intuitive and visually appealing user interfaces that provide exceptional user experiences.",
    image: "https://placehold.co/600x400/008d00/ffffff.png?text=UI+UX+Design",
    dataAiHint: "ui ux",
  },
  {
    title: "Product Roadmap",
    slug: "product-roadmap",
    icon: BarChartBig,
    subServices: [],
    description: "Strategic planning and roadmap development to guide your product's journey from concept to market success.",
    image: "https://placehold.co/600x400/ffc011/000000.png?text=Product+Roadmap",
    dataAiHint: "product strategy",
  },
  {
    title: "Android App Development",
    slug: "android-app-development",
    icon: Smartphone, // Placeholder, specific Android icon if available
    subServices: [],
    description: "Native Android applications built for performance and a seamless user experience on a wide range of devices.",
    image: "https://placehold.co/600x400/008d00/ffffff.png?text=Android+App",
    dataAiHint: "android development",
  },
  {
    title: "iOS App Development",
    slug: "ios-app-development",
    icon: Smartphone, // Placeholder, specific iOS icon if available
    subServices: [],
    description: "Elegant and powerful iOS applications designed to meet Apple's high standards and delight users.",
    image: "https://placehold.co/600x400/ffc011/000000.png?text=iOS+App",
    dataAiHint: "ios development",
  },
  {
    title: "Cross-Platform App Development",
    slug: "cross-platform-app-development",
    icon: Smartphone,
    subServices: [],
    description: "Efficiently build and deploy applications across multiple platforms (iOS, Android, Web) from a single codebase.",
    image: "https://placehold.co/600x400/008d00/ffffff.png?text=Cross+Platform",
    dataAiHint: "cross platform",
  },
  {
    title: "Website Development",
    slug: "website-development",
    icon: Code,
    subServices: [],
    description: "Beautiful, responsive, and high-performing websites that serve as the digital face of your brand.",
    image: "https://placehold.co/600x400/ffc011/000000.png?text=Website+Dev",
    dataAiHint: "website creation",
  },
  {
    title: "Web App Development",
    slug: "web-app-development",
    icon: DatabaseZap,
    subServices: [],
    description: "Complex and scalable web applications with rich interactivity and robust backend systems.",
    image: "https://placehold.co/600x400/008d00/ffffff.png?text=Web+Application",
    dataAiHint: "web application",
  },
  {
    title: "AI Consulting",
    slug: "ai-consulting",
    icon: MessageCircle,
    subServices: [],
    description: "Expert guidance to help you identify and implement AI solutions that drive business value and innovation.",
    image: "https://placehold.co/600x400/ffc011/000000.png?text=AI+Consulting",
    dataAiHint: "ai strategy",
  },
  {
    title: "AI Agent Development",
    slug: "ai-agent-development",
    icon: Bot,
    subServices: [],
    description: "Development of intelligent AI agents capable of autonomous decision-making and task execution.",
    image: "https://placehold.co/600x400/008d00/ffffff.png?text=AI+Agents",
    dataAiHint: "intelligent agents",
  },
  {
    title: "Adaptive AI Development",
    slug: "adaptive-ai-development",
    icon: Brain,
    subServices: [],
    description: "AI systems that learn and adapt over time, continuously improving performance and responsiveness.",
    image: "https://placehold.co/600x400/ffc011/000000.png?text=Adaptive+AI",
    dataAiHint: "learning ai",
  },
  {
    title: "AI Chatbot Development",
    slug: "ai-chatbot-development",
    icon: MessageCircle, // Re-using, can be more specific
    subServices: [],
    description: "Sophisticated AI-powered chatbots for customer service, engagement, and process automation.",
    image: "https://placehold.co/600x400/008d00/ffffff.png?text=AI+Chatbots",
    dataAiHint: "chatbot solutions",
  },
  {
    title: "Custom Software Development",
    slug: "custom-software-development",
    icon: PenTool,
    subServices: [],
    description: "Bespoke software solutions meticulously crafted to meet your unique business requirements and objectives.",
    image: "https://placehold.co/600x400/ffc011/000000.png?text=Custom+Software",
    dataAiHint: "bespoke software",
  },
  {
    title: "Enterprise Software Development",
    slug: "enterprise-software-development",
    icon: Building2,
    subServices: [],
    description: "Robust and scalable software solutions designed for large organizations to optimize operations and drive growth.",
    image: "https://placehold.co/600x400/008d00/ffffff.png?text=Enterprise+Software",
    dataAiHint: "enterprise solutions",
  },
  {
    title: "ICO Development",
    slug: "ico-development",
    icon: Gem, // Placeholder, can be more specific
    subServices: [],
    description: "End-to-end Initial Coin Offering development services, from token creation to launch.",
    image: "https://placehold.co/600x400/ffc011/000000.png?text=ICO+Dev",
    dataAiHint: "cryptocurrency ico",
  },
  {
    title: "Wallet Development",
    slug: "wallet-development",
    icon: ShieldCheck,
    subServices: [],
    description: "Secure and user-friendly cryptocurrency wallet development for various blockchain platforms.",
    image: "https://placehold.co/600x400/008d00/ffffff.png?text=Crypto+Wallet",
    dataAiHint: "crypto wallet",
  },
  {
    title: "Smart Contract Development",
    slug: "smart-contract-development",
    icon: FileText,
    subServices: [],
    description: "Development of self-executing smart contracts for automating agreements and processes on the blockchain.",
    image: "https://placehold.co/600x400/ffc011/000000.png?text=Smart+Contracts",
    dataAiHint: "blockchain contract",
  },
  {
    title: "NFT Development",
    slug: "nft-development",
    icon: Gem, // Re-using
    subServices: [],
    description: "Creation of Non-Fungible Tokens (NFTs) and marketplaces for digital collectibles and assets.",
    image: "https://placehold.co/600x400/008d00/ffffff.png?text=NFT+Dev",
    dataAiHint: "nft marketplace",
  },
  {
    title: "DeFi Development",
    slug: "defi-development",
    icon: GitBranch,
    subServices: [],
    description: "Building decentralized finance (DeFi) applications for lending, borrowing, trading, and more.",
    image: "https://placehold.co/600x400/ffc011/000000.png?text=DeFi+Apps",
    dataAiHint: "decentralized finance",
  },
  {
    title: "Asset Tokenization",
    slug: "asset-tokenization",
    icon: Layers,
    subServices: [],
    description: "Transforming real-world assets into digital tokens on the blockchain for increased liquidity and accessibility.",
    image: "https://placehold.co/600x400/008d00/ffffff.png?text=Asset+Tokenization",
    dataAiHint: "digital assets",
  },
  {
    title: "Real Estate Tokenization",
    slug: "real-estate-tokenization",
    icon: Building2, // Re-using
    subServices: [],
    description: "Tokenizing real estate assets to enable fractional ownership and new investment opportunities.",
    image: "https://placehold.co/600x400/ffc011/000000.png?text=Real+Estate+Tokens",
    dataAiHint: "property tokenization",
  },
   // Adding a few from the old list that might not be directly in the new structure for completeness on the services page
  {
    title: "Cloud & DevOps Services",
    slug: "cloud-devops-services",
    description: "Streamline your development lifecycle and scale your infrastructure with our robust Cloud and DevOps solutions.",
    icon: Cloud,
    subServices: [],
    image: "https://placehold.co/600x400/ffc011/000000.png?text=Cloud+DevOps",
    dataAiHint: "cloud devops",
  },
  {
    title: "Tech Consultancy", // Already somewhat covered by AI Consulting
    slug: "tech-consultancy",
    description: "Expert guidance to navigate complex technology challenges and strategize for digital transformation.",
    icon: Users, 
    subServices: [],
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
  { id: "blockchain", name: "Blockchain"},
  { id: "case-studies", name: "Case Studies"},
  { id: "tutorials", name: "Tutorials"},
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
  {
    id: "5",
    title: "Deep Dive into DeFi Development",
    slug: "deep-dive-defi-development",
    date: "2024-08-01",
    excerpt: "Exploring the core concepts and challenges of building Decentralized Finance applications.",
    category: "blockchain",
    imageUrl: "https://placehold.co/600x400/ffc011/1c1c1c.png?text=DeFi+Deep+Dive",
    dataAiHint: "decentralized finance blockchain",
    content: "Full blog post content about DeFi development...",
    tags: ["DeFi", "Blockchain", "Smart Contracts", "Ethereum"],
  },
  {
    id: "6",
    title: "Case Study: AI-Powered Logistics Optimization",
    slug: "case-study-ai-logistics",
    date: "2024-08-05",
    excerpt: "How CodeCafe Lab helped a major logistics firm reduce costs and improve efficiency using AI.",
    category: "case-studies",
    imageUrl: "https://placehold.co/600x400/008d00/ffffff.png?text=AI+Logistics+Case+Study",
    dataAiHint: "logistics optimization ai",
    content: "Detailed case study on AI in logistics...",
    tags: ["AI", "Case Study", "Logistics", "Optimization", "Machine Learning"],
  },
  {
    id: "7",
    title: "Getting Started with Next.js: A Beginner's Tutorial",
    slug: "nextjs-beginners-tutorial",
    date: "2024-08-10",
    excerpt: "A step-by-step guide to building your first web application with Next.js.",
    category: "tutorials",
    imageUrl: "https://placehold.co/600x400/ffc011/1c1c1c.png?text=NextJS+Tutorial",
    dataAiHint: "nextjs tutorial web",
    content: "Comprehensive tutorial on Next.js for beginners...",
    tags: ["Next.js", "React", "Web Development", "Tutorial", "JavaScript"],
  },
];


    
