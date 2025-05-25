
import type { Metadata } from 'next';
import Link from 'next/link';
import AnimatedHeroText from '@/components/home/AnimatedHeroText';
import YoutubeShortsSection from '@/components/home/YoutubeShortsSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SERVICES_DATA, PRODUCTS_DATA, BLOG_POSTS_DATA, TECH_STACK_DATA, TESTIMONIALS_DATA } from '@/lib/constants';
import { ArrowRight, Bot, Users, Zap, FileText, Brain, Star } from 'lucide-react'; // Added Star
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

  const techStackRow1Count = 13;
  const techStackRow2Count = 12;
  const techStackRow3Count = 10;


  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="relative text-center py-16 md:py-24 rounded-xl overflow-hidden shadow-lg">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
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
              <Link href="/contact">Talk to Us <Bot className="ml-2 h-5 w-5" /></Link>
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

      {/* Featured AI Innovations */}
      <section className="relative overflow-hidden p-8 md:p-12 rounded-xl shadow-lg">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          src="/Featured AI Innovations.mp4"
        >
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10">
          <div className="text-center mb-12">
              <Zap className="h-12 w-12 text-accent mx-auto mb-4" />
              <h2 className="text-3xl font-bold">Featured AI Innovations</h2>
              <p className="text-muted-foreground mt-2">Explore our cutting-edge AI-powered products.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {PRODUCTS_DATA.slice(0, 2).map((product) => (
               <Card key={product.id} className="flex flex-col md:flex-row items-center gap-6 p-6 hover:shadow-xl transition-shadow duration-300 bg-background/80 backdrop-blur-sm">
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
        </div>
      </section>

      {/* CodeCafe Lab Tech Stack Section */}
      <section className="ai-glow-bg pt-8 pb-16 md:pt-12 md:pb-24 rounded-xl">
        <div className="relative z-10 container mx-auto">
            <div className="text-center mb-12">
                <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold">CodeCafe Lab Tech Stack</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                    We leverage a modern and versatile technology stack to build robust, scalable, and innovative solutions.
                </p>
            </div>
            <div className="space-y-6">
                {/* Row 1 */}
                <div className="flex flex-wrap justify-center items-center gap-4">
                  {TECH_STACK_DATA.slice(0, techStackRow1Count).map((tech, itemIndex) => (
                    <div 
                      key={tech.name} 
                      className="w-28 h-28 flex flex-col items-center justify-center p-3 bg-card rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
                    >
                      <tech.icon className={`h-8 w-8 mb-2 ${itemIndex % 2 === 0 ? 'text-primary' : 'text-accent'}`} />
                      <p className="text-xs font-medium text-center text-muted-foreground">{tech.name}</p>
                    </div>
                  ))}
                </div>
                {/* Row 2 */}
                <div className="flex flex-wrap justify-center items-center gap-4">
                  {TECH_STACK_DATA.slice(techStackRow1Count, techStackRow1Count + techStackRow2Count).map((tech, itemIndex) => (
                    <div 
                      key={tech.name} 
                      className="w-28 h-28 flex flex-col items-center justify-center p-3 bg-card rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
                    >
                      <tech.icon className={`h-8 w-8 mb-2 ${itemIndex % 2 === 0 ? 'text-primary' : 'text-accent'}`} />
                      <p className="text-xs font-medium text-center text-muted-foreground">{tech.name}</p>
                    </div>
                  ))}
                </div>
                {/* Row 3 */}
                <div className="flex flex-wrap justify-center items-center gap-4">
                  {TECH_STACK_DATA.slice(techStackRow1Count + techStackRow2Count, techStackRow1Count + techStackRow2Count + techStackRow3Count).map((tech, itemIndex) => (
                    <div 
                      key={tech.name} 
                      className="w-28 h-28 flex flex-col items-center justify-center p-3 bg-card rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
                    >
                      <tech.icon className={`h-8 w-8 mb-2 ${itemIndex % 2 === 0 ? 'text-primary' : 'text-accent'}`} />
                      <p className="text-xs font-medium text-center text-muted-foreground">{tech.name}</p>
                    </div>
                  ))}
                </div>
            </div>
        </div>
      </section>

      {/* What Our Clients Say Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="relative w-full overflow-hidden group">
          <div 
            className="flex animate-marquee group-hover:pause whitespace-nowrap" 
            style={{ willChange: 'transform' }}
          >
            {[...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA].map((testimonial, index) => (
              <Card 
                key={`${testimonial.id}-${index}`} 
                className="flex-shrink-0 w-72 md:w-80 mx-4 bg-card flex flex-col"
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <Image 
                        src={testimonial.avatarUrl} 
                        alt={testimonial.name} 
                        width={60} 
                        height={60} 
                        className="rounded-full mr-4 object-cover" 
                        data-ai-hint={testimonial.dataAiHint} 
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {testimonial.role}
                        {testimonial.company ? `, ${testimonial.company}` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? 'text-primary fill-primary' : 'text-muted-foreground/30'}`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic flex-grow line-clamp-3">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
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
       <section className="relative overflow-hidden text-center py-16 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          src="/coffee_with_codecafelab.mp4"
        >
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10">
          <Users className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Brew Your Next Big Idea?</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Let&apos;s collaborate to build innovative solutions that drive your business forward.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/contact">Start a Project <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
