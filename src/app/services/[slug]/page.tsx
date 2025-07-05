
import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SERVICES_DATA } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Tag, DollarSign, ArrowLeft } from 'lucide-react';

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

  return (
    <div className="space-y-16">
        <Link href="/services" className="inline-flex items-center text-primary hover:underline mb-8 group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to All Services
        </Link>
      <header className="text-center">
        <Badge variant="outline" className="border-primary text-primary mb-4">{service.category}</Badge>
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <service.icon className="h-10 w-10 text-primary" />
            {service.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {service.description}
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-12 items-start">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
                data-ai-hint={service.dataAiHint}
                />
            </div>
          <div className="prose dark:prose-invert prose-lg max-w-none">
            <h2 className="text-2xl font-semibold">Detailed Description</h2>
            <p>{service.detailedDescription}</p>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-8 sticky top-24">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><Tag className="h-5 w-5 text-accent"/> Technologies & Tools</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {service.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl"><DollarSign className="h-5 w-5 text-accent"/> Pricing Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-semibold text-foreground">{service.pricing.type}</p>
              <p className="text-muted-foreground">{service.pricing.range}</p>
            </CardContent>
          </Card>
          <Button asChild size="lg" className="w-full">
            <Link href="/contact">
              Get a Quote <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </aside>
      </div>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="pt-12 border-t">
          <h2 className="text-3xl font-bold text-center mb-12">Related Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedServices.map((related) => (
               <Card key={related.slug} className="group flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
                 <CardHeader>
                    <div className="flex items-center gap-3">
                        <related.icon className="h-7 w-7 text-primary" />
                        <CardTitle className="text-xl">{related.title}</CardTitle>
                    </div>
                 </CardHeader>
                 <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-3">{related.description}</p>
                 </CardContent>
                 <CardFooter>
                    <Button asChild variant="link" className="p-0 text-primary">
                      <Link href={`/services/${related.slug}`}>
                        Learn More <ArrowRight className="ml-1 h-4 w-4" />
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
