
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
import { Mail, Phone, MapPin, CheckCircle, Loader2, AlertTriangle } from 'lucide-react';

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(1, "Subject is required."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit contact form.');
      }

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you! We'll get back to you as soon as possible.",
        duration: 9002,
      });
      form.reset();
    } catch (error: any) {
      console.error("Contact form submission error:", error);
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
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have a question, a project idea, or just want to say hello? We&apos;d love to hear from you. Reach out using the form below or through our contact details.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-start">
        <Card className="shadow-xl border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2"><Mail className="h-7 w-7 text-primary" />Send Us a Message</CardTitle>
            <CardDescription>
              Fill out the form and we&apos;ll get back to you as soon as possible.
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
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Project Inquiry" {...field} />
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
                      <FormLabel>Your Message</FormLabel>
                      <FormControl>
                        <Textarea rows={5} placeholder="Tell us more about your needs..." {...field} />
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

        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2"><MapPin className="h-6 w-6 text-primary" />Our Office</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-1">
                    <p className="font-semibold text-foreground">CodeCafe Lab Headquarters</p>
                    <p>Manglam Grand City, Jaipur, Rajasthan, 302026</p>
                    <p>India</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2"><Phone className="h-6 w-6 text-primary" />Call Us</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-1">
                    <p><strong>General Inquiries:</strong> <a href="tel:+917852010838" className="hover:text-primary">+91 7852010838</a></p>
                    <p><strong>Sales:</strong> <a href="tel:+917852010838" className="hover:text-primary">+91 7852010838</a></p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2"><Mail className="h-6 w-6 text-primary" />Email Us</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-1">
                    <p><strong>General:</strong> <a href="mailto:hello@codecafelab.in" className="hover:text-primary">hello@codecafelab.in</a></p>
                    <p><strong>Support:</strong> <a href="mailto:support@codecafelab.in" className="hover:text-primary">support@codecafelab.in</a></p>
                    <p><strong>Careers:</strong> <a href="mailto:career@codecafelab.in" className="hover:text-primary">career@codecafelab.in</a></p>
                </CardContent>
            </Card>
        </div>
      </section>
    </div>
  );
}
