
import type { Metadata } from 'next';
import Link from 'next/link';
import AnimatedHeroText from '@/components/home/AnimatedHeroText';
import YoutubeShortsSection from '@/components/home/YoutubeShortsSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SERVICES_DATA, PRODUCTS_DATA, BLOG_POSTS_DATA, TECH_STACK_DATA } from '@/lib/constants';
import { ArrowRight, Bot, Users, Zap, FileText, Brain, Package, Server, Cloud, Palette, GitFork, Container, Share, FileCode, PenTool, Smartphone } from 'lucide-react'; // Added more icons for tech stack
import Image from 'next/image';
import BlogPostCard from '@/components/blog/BlogPostCard';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to CodeCafe Lab - Where Innovation, AI, and Creativity meet to brew exceptional software solutions.',
};

export default function HomePage() {
  const heroTexts = [
    "Brewed Software with AI Precision",
    "Innovative Solutions for a Digital World",
    "Your Partner in Tech Excellence",
  ];

  const featuredServices = SERVICES_DATA.slice(0, 5);
  const featuredBlogPosts = BLOG_POSTS_DATA.slice(0, 3);

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="relative text-center py-16 md:py-24 rounded-xl overflow-hidden bg-card shadow-lg">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 dark:opacity-40"
          src="/codecafelab_herobgvideo.mp4"
        >
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <AnimatedHeroText texts={heroTexts} />
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            CodeCafe Lab blends innovation, AI, and creativity to deliver cutting-edge software solutions tailored for your success.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/consultancy">Get a Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/ai">Talk to Us <Bot className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* YouTube Shorts Section */}
      <YoutubeShortsSection />

      {/* Services Overview */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Expertise</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            We offer a comprehensive suite of services to transform your ideas into reality, leveraging the latest technologies and agile methodologies for exceptional results.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service) => (
            <Card key={service.slug} className="hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <service.icon className="h-10 w-10 text-primary" />
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{service.description || 'Explore our expert services.'}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild className="mt-4 px-0 text-primary">
                  <Link href={`/services#${service.slug}`}>Learn More <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
          {/* See All Services Card */}
          <Card className="flex flex-col items-center justify-between p-6 text-center bg-card hover:shadow-xl transition-shadow duration-300 h-full border-2 border-primary/30">
            <CardHeader className="p-2">
              <CardTitle className="text-2xl text-primary">Explore All Services</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center p-2">
              <p className="text-muted-foreground mb-4">
                Dive deeper into our comprehensive range of solutions.
              </p>
            </CardContent>
            <CardFooter className="p-2 w-full">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                <Link href="/services">
                  See All <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Featured AI Solutions */}
      <section className="bg-card p-8 md:p-12 rounded-xl shadow-lg">
        <div className="text-center mb-12">
            <Zap className="h-12 w-12 text-accent mx-auto mb-4" />
            <h2 className="text-3xl font-bold">Featured AI Innovations</h2>
            <p className="text-muted-foreground mt-2">Explore our cutting-edge AI-powered products.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {PRODUCTS_DATA.slice(0, 2).map((product) => (
             <Card key={product.id} className="flex flex-col md:flex-row items-center gap-6 p-6 hover:shadow-xl transition-shadow duration-300">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={150}
                height={100}
                className="rounded-md object-cover w-full md:w-[150px] h-auto md:h-[100px]"
                data-ai-hint={product.dataAiHint}
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-primary">{product.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-3">{product.description}</p>
                <Button variant="outline" asChild size="sm">
                  <Link href={`/products#${product.id}`}>Discover <Bot className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
            <Button asChild size="lg" variant="ghost" className="text-accent hover:text-accent/90 hover:bg-accent/10">
                <Link href="/ai">Explore All AI Solutions <ArrowRight className="ml-2 h-5 w-5"/></Link>
            </Button>
        </div>
      </section>

      {/* CodeCafe Lab Tech Stack Section */}
      <section>
        <div className="text-center mb-12">
            <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold">CodeCafe Lab Tech Stack</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                We leverage a modern and versatile technology stack to build robust, scalable, and innovative solutions.
            </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
            {TECH_STACK_DATA.map((tech) => (
              <div key={tech.name} className="flex flex-col items-center p-4 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 aspect-[4/3] justify-center">
                <tech.icon className="h-10 w-10 sm:h-12 sm:w-12 text-accent mb-3" />
                <p className="text-xs sm:text-sm font-medium text-center text-muted-foreground">{tech.name}</p>
              </div>
            ))}
        </div>
      </section>

      {/* Testimonial Slider Placeholder */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <Card key={i} className="bg-secondary/50 p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Image src={`https://placehold.co/60x60.png`} alt={`Client ${i}`} width={60} height={60} className="rounded-full mr-4" data-ai-hint="person avatar" />
                  <div>
                    <h4 className="font-semibold">Client Name {i}</h4>
                    <p className="text-sm text-muted-foreground">CEO, Company {i}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"CodeCafe Lab delivered an outstanding product that exceeded our expectations. Their team is professional, skilled, and a pleasure to work with."</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Client Logos Section Placeholder */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Trusted By</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {[...Array(5)].map((_, i) => (
            <Image
              key={i}
              src={`https://placehold.co/120x60/ffffff/cccccc.png?text=Client${i+1}`}
              alt={`Client Logo ${i+1}`}
              width={120}
              height={60}
              className="opacity-70 hover:opacity-100 transition-opacity duration-300"
              data-ai-hint="company logo"
            />
          ))}
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section>
        <div className="text-center mb-12">
            <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold">Latest From Our Blog</h2>
            <p className="text-muted-foreground mt-2">Stay updated with our newest articles and insights.</p>
        </div>
        {featuredBlogPosts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No blog posts available yet.</p>
        )}
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="text-primary border-primary hover:bg-primary/10 hover:text-primary">
            <Link href="/blog">
              See All Articles <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

       {/* Call to Action section */}
       <section className="text-center py-16 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl">
        <Users className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Ready to Brew Your Next Big Idea?</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
          Let&apos;s collaborate to build innovative solutions that drive your business forward.
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/contact">Start a Project <ArrowRight className="ml-2 h-5 w-5" /></Link>
        </Button>
      </section>
    </div>
  );
}
