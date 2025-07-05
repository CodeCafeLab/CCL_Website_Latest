
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, DollarSign, Lightbulb, MessageSquare, BarChart3 } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Tech Consultancy',
  description: 'Expert tech consultancy services from CodeCafe Lab for fintech, healthtech, logistics, and startups. Schedule a consultation today.',
};

const industriesServed = [
  { name: 'Fintech', icon: DollarSign, description: "Innovative solutions for financial institutions, enhancing security and user experience.", image: "https://placehold.co/600x400.png", dataAiHint: "fintech app" },
  { name: 'Healthtech', icon: Lightbulb, description: "Transforming healthcare with technology, improving patient care and operational efficiency.", image: "https://placehold.co/600x400.png", dataAiHint: "medical technology" },
  { name: 'Logistics', icon: BarChart3, description: "Optimizing supply chains and logistics operations with data-driven insights and automation.", image: "https://placehold.co/600x400.png", dataAiHint: "supply chain" },
  { name: 'Startups', icon: MessageSquare, description: "Guiding startups from idea to launch with tailored tech strategies and MVP development.", image: "https://placehold.co/600x400.png", dataAiHint: "startup meeting" },
];

const consultancyBenefits = [
  "Strategic Technology Roadmapping",
  "AI & ML Integration Strategy",
  "Digital Transformation Guidance",
  "Scalable Architecture Design",
  "Process Optimization & Automation",
  "Cybersecurity & Compliance Advisory"
];

export default function ConsultancyPage() {
  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Expert Tech Consultancy</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Leverage our deep industry knowledge and technical expertise to navigate complex challenges and achieve your business objectives. We provide strategic guidance to help you innovate and grow.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Industries We Serve</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industriesServed.map((industry) => (
            <Card key={industry.name} className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center">
                <Image src={industry.image} alt={industry.name} width={300} height={200} className="rounded-t-md mb-4 object-cover" data-ai-hint={industry.dataAiHint} />
                <div className="p-3 bg-primary/10 rounded-full inline-block">
                    <industry.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-2">{industry.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{industry.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <section className="bg-card p-8 md:p-12 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-12">Benefits of Our Tech Consultancy</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 max-w-4xl mx-auto">
          {consultancyBenefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <p className="text-foreground">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Card className="max-w-2xl mx-auto shadow-xl border-2 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Schedule a Consultation</CardTitle>
            <CardDescription>
              Ready to discuss your project or challenges? Fill out the form below, and one of our expert consultants will get in touch with you shortly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                  <Input type="text" id="name" name="name" placeholder="John Doe" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email Address</label>
                  <Input type="email" id="email" name="email" placeholder="you@example.com" required />
                </div>
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-foreground mb-1">Company (Optional)</label>
                <Input type="text" id="company" name="company" placeholder="Your Company Inc." />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Your Message/Inquiry</label>
                <Textarea id="message" name="message" rows={5} placeholder="Briefly describe your project or question..." required />
              </div>
              <Button type="submit" className="w-full" size="lg">Send Message</Button>
            </form>
             <p className="text-xs text-muted-foreground mt-4 text-center">
                Note: This is a placeholder form. Form submission functionality (React Hook Form, validation) needs to be implemented.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
