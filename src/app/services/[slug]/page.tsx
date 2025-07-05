
import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SERVICES_DATA } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Tag, DollarSign, ArrowLeft } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type Props = {
  params: { slug: string };
};

// Generate static routes for each service
export async function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

// Generate dynamic metadata for each service page
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const service = SERVICES_DATA.find((s) => s.slug === params.slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 800,
          alt: service.title,
        },
      ],
    },
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = SERVICES_DATA.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const relatedServices = SERVICES_DATA.filter(
    (s) => s.category === service.category && s.slug !== service.slug
  ).slice(0, 3);

  const processSteps = [
    { num: 1, title: "Discovery & Strategy", description: "We start by understanding your vision, goals, and challenges to define a clear roadmap." },
    { num: 2, title: "Design & Prototyping", description: "Our team crafts intuitive UI/UX designs and interactive prototypes for your approval." },
    { num: 3, title: "Development & Testing", description: "Expert developers bring the designs to life with clean code, followed by rigorous testing." },
    { num: 4, title: "Launch & Optimization", description: "We deploy your solution and monitor its performance for continuous improvement and growth." }
  ];

  const faqItems = [
    {
      value: "item-1",
      question: "How long does a typical project take?",
      answer: "Project timelines vary depending on the complexity and scope. A simple project might take a few weeks, while a more complex application could take several months. We provide a detailed timeline after our initial discovery phase."
    },
    {
      value: "item-2",
      question: "How do you handle project communication?",
      answer: "We believe in transparent and frequent communication. You'll have a dedicated project manager and regular check-ins via your preferred method (email, calls, Slack). We also provide access to a project management tool to track progress."
    },
    {
      value: "item-3",
      question: "What is your pricing model?",
      answer: "We offer flexible pricing models, including hourly rates, fixed project-based costs, and retainer agreements for ongoing work. We'll work with you to determine the best model for your needs and budget."
    }
  ];

  return (
    <div className="space-y-16 md:space-y-24">
      <div className="space-y-8">
        <Link href="/services" className="inline-flex items-center text-primary hover:underline group">
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to All Services
        </Link>
        <header className="text-center">
          <Badge variant="outline" className="border-primary text-primary mb-4">{service.category}</Badge>
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <service.icon className="h-10 w-10 text-primary" />
            </div>
            {service.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {service.description}
          </p>
        </header>
      </div>

      <div className="grid lg:grid-cols-5 gap-12 items-start">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="bg-primary"
              priority
              data-ai-hint={service.dataAiHint}
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Detailed Description</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>{service.detailedDescription}</p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-2 space-y-6 sticky top-24">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Tag className="h-5 w-5 text-primary" /> Key Technologies</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {service.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20">
                  {tech}
                </Badge>
              ))}
            </CardContent>
          </Card>
          <Card className="shadow-lg border-primary/20 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><DollarSign className="h-5 w-5 text-primary" /> Pricing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-2xl font-bold text-foreground">{service.pricing.range}</p>
              <p className="text-sm text-muted-foreground -mt-2">{service.pricing.type}</p>
              <Button asChild size="lg" className="w-full">
                <Link href="/contact">
                  Request a Custom Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>

      <section className="pt-16 border-t">
        <h2 className="text-3xl font-bold text-center mb-12">What You Get</h2>
        <Card className="max-w-4xl mx-auto shadow-md">
          <CardContent className="p-8 grid md:grid-cols-2 gap-x-8 gap-y-6">
            {[
              "Custom-tailored Strategy",
              "Dedicated Project Manager",
              "Transparent Reporting & Analytics",
              "Scalable & Future-Proof Solutions",
              "Comprehensive QA & Testing",
              "Post-Launch Support"
            ].map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <p className="text-foreground">{feature}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="pt-16 border-t">
        <h2 className="text-3xl font-bold text-center mb-12">Our Proven Process</h2>
        <div className="relative grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-border -z-10"></div>
          {processSteps.map((step) => (
            <div key={step.num} className="relative text-center p-4">
              <div className="relative z-10 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-2xl border-4 border-background mb-4 shadow-lg">
                {step.num}
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-16 border-t">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map(item => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="pt-16 border-t">
          <h2 className="text-3xl font-bold text-center mb-12">Related Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedServices.map((related) => (
              <Card key={related.slug} className="group flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 border-transparent hover:border-primary">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <related.icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{related.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-3">{related.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="p-0 text-primary group-hover:underline">
                    <Link href={`/services/${related.slug}`}>
                      Learn More <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
