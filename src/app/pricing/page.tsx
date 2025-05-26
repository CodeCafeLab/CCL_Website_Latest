
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, Package, TrendingUp, CheckCircle, BadgeIndianRupee } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Pricing Models',
  description: 'Explore CodeCafe Lab\'s flexible pricing options, including hourly rates, project-based costs, and profit-sharing models for various tech services.',
};

const hourlyPricingData = [
  { service: 'Web/App UI-UX', inr: '₹1,500 - ₹3,000', usd: '$18 - $36' },
  { service: 'Mobile App Dev (React Native)', inr: '₹1,800 - ₹3,500', usd: '$22 - $42' },
  { service: 'Mobile App Dev (Java)', inr: '₹2,000 - ₹3,500', usd: '$24 - $42' },
  { service: 'Web App Dev (React/Node.js)', inr: '₹2,000 - ₹4,000', usd: '$24 - $48' },
  { service: 'PHP/Laravel Dev', inr: '₹1,800 - ₹3,500', usd: '$22 - $42' },
  { service: 'Social Media Account Setup & Management', inr: '₹1,200 - ₹2,500', usd: '$15 - $30' },
  { service: 'AI Bot Setups', inr: '₹2,500 - ₹5,000', usd: '$30 - $60' },
  { service: 'Embedded Smart System Apps', inr: '₹3,000 - ₹6,000', usd: '$36 - $72' },
];

const projectBasedPricingData = [
  { service: 'UI/UX Design (Basic)', inr: '₹25,000 - ₹50,000', usd: '$300 - $600' },
  { service: 'UI/UX Design (Advanced)', inr: '₹50,000 - ₹1,50,000', usd: '$600 - $1,800' },
  { service: 'Mobile App (Simple)', inr: '₹1,00,000 - ₹2,50,000', usd: '$1,200 - $3,000' },
  { service: 'Mobile App (Medium Complexity)', inr: '₹2,50,000 - ₹5,00,000', usd: '$3,000 - $6,000' },
  { service: 'Mobile App (High Complexity)', inr: '₹5,00,000 - ₹15,00,000', usd: '$6,000 - $18,000' },
  { service: 'Web App (Basic)', inr: '₹75,000 - ₹2,00,000', usd: '$900 - $2,400' },
  { service: 'Web App (Complex)', inr: '₹2,00,000 - ₹6,00,000', usd: '$2,400 - $7,200' },
  { service: 'AI Bot Setup', inr: '₹1,00,000 - ₹5,00,000', usd: '$1,200 - $6,000' },
  { service: 'Embedded System Apps', inr: '₹2,50,000 - ₹10,00,000', usd: '$3,000 - $12,000' },
  { service: 'Startup Branding', inr: '₹1,50,000 - ₹10,00,000', usd: '$1,700 - $10,000' },
];

const profitSharingData = [
  { item: '20-30% profit share for SaaS-based apps.' },
  { item: '10-25% revenue share for subscription-based apps.' },
  { item: 'Equity-based collaboration for long-term partnerships.' },
];

export default function PricingPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <BadgeIndianRupee className="h-10 w-10 text-primary inline-block" />
          Our Pricing Models
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Our pricing model is structured to accommodate both hourly rates and fixed project costs. We offer flexible and transparent pricing to meet your specific project needs and budget.
        </p>
      </section>

      {/* Hourly Pricing Model */}
      <section>
        <Card className="shadow-lg border-primary/20">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-primary" />
              Hourly Pricing Model
            </CardTitle>
            <CardDescription>
              A competitive hourly rate ensures fair compensation for our time and effort. Ideal for projects with evolving scopes or ongoing support needs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Service</TableHead>
                  <TableHead>Hourly Rate (INR)</TableHead>
                  <TableHead>Hourly Rate (USD)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hourlyPricingData.map((item) => (
                  <TableRow key={item.service}>
                    <TableCell className="font-medium">{item.service}</TableCell>
                    <TableCell>{item.inr}</TableCell>
                    <TableCell>{item.usd}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-6 text-sm text-muted-foreground text-center">
              Contact us at <Link href="mailto:hello@codecafelab.in" className="text-primary hover:underline">hello@codecafelab.in</Link> or visit <Link href="https://www.codecafelab.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.codecafelab.in</Link> for a detailed consultation.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Project-Based Pricing Model */}
      <section>
        <Card className="shadow-lg border-accent/20">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Package className="h-8 w-8 text-accent" />
              Project-Based Pricing Model
            </CardTitle>
            <CardDescription>
              For fixed-price projects, the cost depends on complexity, features, and time required. This model provides cost predictability for well-defined scopes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Service/Project Type</TableHead>
                  <TableHead>Estimated Cost (INR)</TableHead>
                  <TableHead>Estimated Cost (USD)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectBasedPricingData.map((item) => (
                  <TableRow key={item.service}>
                    <TableCell className="font-medium">{item.service}</TableCell>
                    <TableCell>{item.inr}</TableCell>
                    <TableCell>{item.usd}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
             <p className="text-xs text-muted-foreground mt-4 text-center">
                Note: These are estimates. Actual project costs may vary. Contact us for a custom quote.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Profit-Sharing Model */}
      <section>
        <Card className="shadow-lg bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-primary" />
              Profit-Sharing Model
            </CardTitle>
            <CardDescription>
              For complete projects with revenue-sharing potential, we are open to collaborative partnership models.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-lg">
              {profitSharingData.map((item) => (
                <li key={item.item} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <span>{item.item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-muted-foreground">
              We believe in fostering long-term partnerships where success is mutual. If you have a project that aligns with this model, let's discuss how we can grow together.
            </p>
          </CardContent>
        </Card>
      </section>

       <section className="text-center py-8">
            <h2 className="text-2xl font-semibold mb-4">Ready to Discuss Your Project?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                We offer tailored solutions to fit your unique requirements. Get in touch for a personalized quote and consultation.
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90">
                Contact Us for a Custom Quote
            </Link>
        </section>
    </div>
  );
}

    