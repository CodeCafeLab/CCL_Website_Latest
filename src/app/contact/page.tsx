
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with CodeCafe Lab. We are here to answer your questions and discuss your projects.',
};

export default function ContactPage() {
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
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1">Subject</label>
                <Input type="text" id="subject" name="subject" placeholder="Project Inquiry" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">Your Message</label>
                <Textarea id="message" name="message" rows={5} placeholder="Tell us more about your needs..." required />
              </div>
              <Button type="submit" className="w-full" size="lg">Send Message</Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4 text-center">
                Note: This is a placeholder form. Form submission functionality (React Hook Form, validation) needs to be implemented.
            </p>
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
