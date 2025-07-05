
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Briefcase, MapPin, Users, Sparkles, ArrowRight } from 'lucide-react';
import OpenPositionsSlider from '@/components/career/OpenPositionsSlider'; // Import the new component
import type { OpenPosition } from '@/types';

export const metadata: Metadata = {
  title: 'Careers at CodeCafe Lab',
  description: 'Join our innovative team at CodeCafe Lab. Explore open positions, learn about our company culture, and apply today.',
};

const openPositionsData: OpenPosition[] = [ // Renamed to avoid conflict if OpenPosition type is imported
  { id: '1', title: 'Senior AI Engineer', location: 'Remote / New York', type: 'Full-time', description: 'Lead the development of cutting-edge AI models and solutions, working with a talented team of researchers and engineers to solve complex problems.', applyUrl: '#' },
  { id: '2', title: 'Frontend Developer (React/Next.js)', location: 'Remote', type: 'Full-time', description: 'Craft beautiful and performant user interfaces using React, Next.js, and Tailwind CSS. Collaborate closely with UI/UX designers and backend developers.', applyUrl: '#' },
  { id: '3', title: 'UX/UI Designer', location: 'New York', type: 'Contract', description: 'Design intuitive and engaging user experiences across our web and mobile platforms. Create wireframes, prototypes, and high-fidelity mockups.', applyUrl: '#' },
  { id: '4', title: 'DevOps Engineer', location: 'Remote', type: 'Full-time', description: 'Build and maintain our CI/CD pipelines, manage cloud infrastructure, and ensure the reliability and scalability of our services using modern DevOps practices.', applyUrl: '#' },
  { id: '5', title: 'Product Manager - AI Platforms', location: 'New York / Remote', type: 'Full-time', description: 'Define the vision, strategy, and roadmap for our AI-powered products. Work closely with engineering, design, and marketing teams to deliver impactful solutions.', applyUrl: '#' },
];

const teamTestimonials = [
  { name: 'Alex Chen', role: 'Software Engineer', quote: "CodeCafe Lab fosters a culture of learning and growth. I'm constantly challenged and supported by an amazing team.", avatarUrl: "https://placehold.co/80x80.png", dataAiHint:"software engineer" },
  { name: 'Maria Rodriguez', role: 'AI Researcher', quote: "Working on cutting-edge AI projects here is incredibly rewarding. The company truly values innovation.", avatarUrl: "https://placehold.co/80x80.png", dataAiHint:"ai researcher" },
];

export default function CareerPage() {
  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          At CodeCafe Lab, we're passionate about building the future of technology. If you're driven by innovation, creativity, and a desire to make an impact, we'd love to hear from you.
        </p>
      </section>

      {/* Company Culture Section */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Culture: Brewed for Success</h2>
          <div className="space-y-4 text-muted-foreground">
            <p className="flex items-start gap-3"><Sparkles className="h-6 w-5 text-primary flex-shrink-0 mt-1" /> <strong>Innovation First:</strong> We encourage curiosity and provide a platform for brilliant ideas to flourish.</p>
            <p className="flex items-start gap-3"><Users className="h-6 w-5 text-primary flex-shrink-0 mt-1" /> <strong>Collaborative Spirit:</strong> Our strength lies in our diverse team working together towards common goals.</p>
            <p className="flex items-start gap-3"><Briefcase className="h-6 w-5 text-primary flex-shrink-0 mt-1" /> <strong>Growth & Learning:</strong> Continuous development is key. We invest in our team's skills and career progression.</p>
             <p className="flex items-start gap-3"><MapPin className="h-6 w-5 text-primary flex-shrink-0 mt-1" /> <strong>Work-Life Harmony:</strong> We believe in a healthy balance, offering flexible work arrangements.</p>
          </div>
        </div>
        <Image 
            src="https://placehold.co/600x400.png" 
            alt="CodeCafe Lab team collaborating" 
            width={600} 
            height={400} 
            className="rounded-lg object-cover shadow-lg"
            data-ai-hint="office meeting"
        />
      </section>

      {/* Open Positions Section */}
      <section className="overflow-hidden"> {/* Added overflow-hidden to contain the buttons if they extend beyond this section's padding */}
        <h2 className="text-3xl font-bold text-center mb-8">Open Positions</h2> {/* Reduced mb from 12 to 8 */}
        <OpenPositionsSlider positions={openPositionsData} /> {/* Use the new slider component */}
      </section>

      {/* Team Testimonials Section */}
      <section className="bg-card p-8 md:p-12 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-12">From Our Team</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {teamTestimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Image src={testimonial.avatarUrl} alt={testimonial.name} width={60} height={60} className="rounded-full mr-4" data-ai-hint={testimonial.dataAiHint} />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-primary">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
