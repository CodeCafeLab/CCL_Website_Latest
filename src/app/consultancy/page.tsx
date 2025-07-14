
"use client";

import type { Metadata } from 'next';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, DollarSign, Lightbulb, MessageSquare, BarChart3, Loader2, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

// Consultancy form schema
const consultancyFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ConsultancyFormData = z.infer<typeof consultancyFormSchema>;

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
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ConsultancyFormData>({
    resolver: zodResolver(consultancyFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<ConsultancyFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/consultancy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit consultancy request.');
      }

      toast({
        title: "Consultancy Request Submitted!",
        description: "Thank you! We'll review your request and get back to you shortly.",
        duration: 9002,
      });
      form.reset();
    } catch (error: any) {
      console.error("Consultancy form submission error:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message || "Something went wrong. Please try again.",
        duration: 9002,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Company Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Message/Inquiry</FormLabel>
                      <FormControl>
                        <Textarea rows={5} placeholder="Briefly describe your project or question..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
