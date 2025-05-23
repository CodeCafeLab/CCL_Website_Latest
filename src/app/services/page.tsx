import type { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SERVICES_DATA } from '@/lib/constants';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore the range of software development, AI/ML, mobile app, DevOps, and UI/UX design services offered by CodeCafe Lab.',
};

export default function ServicesPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We offer a comprehensive suite of services to transform your ideas into reality, leveraging the latest technologies and agile methodologies.
        </p>
      </section>

      <section className="space-y-16">
        {SERVICES_DATA.map((service, index) => (
          <Card 
            key={service.title} 
            className={`overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ${index % 2 === 0 ? 'bg-card' : 'bg-secondary/30'}`}
          >
            <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
              <div className="md:w-2/5 w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-64 md:h-full"
                  data-ai-hint={service.dataAiHint}
                />
              </div>
              <div className="md:w-3/5 w-full p-6 md:p-10">
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <service.icon className="h-10 w-10 text-primary" />
                    <CardTitle className="text-3xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <CardDescription className="text-base mb-6">{service.description}</CardDescription>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-accent" /> Agile Development Process</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-accent" /> Dedicated Project Management</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-accent" /> Scalable and Secure Solutions</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-accent" /> Post-Launch Support</li>
                  </ul>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
