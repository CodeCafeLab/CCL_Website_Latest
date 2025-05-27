import type { Metadata } from 'next';
import Image from 'next/image';
import CompanyTimeline from '@/components/company/CompanyTimeline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Lightbulb, Heart, CalendarDays } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Company',
  description: 'Learn about CodeCafe Lab\'s story, values, team, mission, vision, and our journey of growth.',
};

const teamMembers = [
  { name: 'Gaurav Saini', role: 'Vibe Coder and business manager', image: '/gaurav.jpg', dataAiHint: 'Gaurav Saini portrait' },
  { name: 'Sarita Tak', role: 'Vibe Coder and business manager', image: '/sarita.jpg', dataAiHint: 'Sarita Tak portrait' },
];

const values = [
  { title: 'Innovation', icon: Lightbulb, description: 'We constantly seek new ways to solve problems and push boundaries.' },
  { title: 'Collaboration', icon: Users, description: 'Teamwork and open communication are at the heart of our success.' },
  { title: 'Integrity', icon: Heart, description: 'We operate with honesty and transparency in all our interactions.' },
  { title: 'Excellence', icon: Target, description: 'We are committed to delivering high-quality solutions and services.' },
];

export default function CompanyPage() {
  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">About CodeCafe Lab</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We are a passionate team of innovators, developers, and strategists dedicated to crafting exceptional software solutions that drive progress and create value.
        </p>
      </section>

      {/* Our Story Section */}
      <section>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-2"><Lightbulb className="h-8 w-8 text-primary" />Our Story</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-muted-foreground mb-4">
                Founded on the principle that great software is brewed with a blend of technical expertise, creative thinking, and a deep understanding of user needs, CodeCafe Lab embarked on its journey to make a mark in the tech world.
              </p>
              <p className="text-muted-foreground">
                From humble beginnings, we've grown into a dynamic company, tackling complex challenges and delivering impactful solutions for clients across various industries. Our passion for AI and innovation continues to fuel our growth and inspire our work.
              </p>
            </div>
            <Image 
              src="https://placehold.co/600x400/ffc011/000000.png?text=Our+Journey" 
              alt="CodeCafe Lab team working" 
              width={600} 
              height={400} 
              className="rounded-lg object-cover"
              dataAiHint="team working" 
            />
          </CardContent>
        </Card>
      </section>

      {/* Mission & Vision Section */}
      <section className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2"><Target className="h-7 w-7 text-primary" />Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To empower businesses with transformative technology solutions, fostering innovation and driving sustainable growth through creativity, expertise, and a commitment to excellence.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2"><Lightbulb className="h-7 w-7 text-accent" />Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To be a globally recognized leader in AI-driven software development, known for our innovative spirit, ethical practices, and the positive impact we create for our clients and communities.
            </p>
          </CardContent>
        </Card>
      </section>
      
      {/* Our Values Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map(value => (
            <Card key={value.title} className="text-center p-6 hover:shadow-xl transition-shadow duration-300">
              <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Carousel Placeholder */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2"><Users className="h-8 w-8 text-primary" />Meet Our Team</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center overflow-hidden group">
              <Image 
                src={member.image} 
                alt={member.name} 
                width={300} 
                height={300} 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                data-ai-hint={member.dataAiHint}
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-primary">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Company Timeline Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2"><CalendarDays className="h-8 w-8 text-primary" />Our Journey & Milestones</h2>
        <CompanyTimeline />
      </section>
    </div>
  );
}
