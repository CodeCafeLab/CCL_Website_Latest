import type { Metadata } from 'next';
import AIProductDiscoveryClient from '@/components/ai/AIProductDiscoveryClient';
import { BrainCircuit, Cpu, Bot } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'AI Innovations',
  description: 'Explore CodeCafe Lab\'s cutting-edge AI innovations, GPT-based products, and automation bots. Try our AI Product Discovery tool.',
};

const aiFeatures = [
    {
        icon: BrainCircuit,
        title: "Advanced Machine Learning",
        description: "We build sophisticated ML models for prediction, classification, and clustering to solve complex business problems.",
        image: "https://placehold.co/600x400.png",
        dataAiHint: "machine learning"
    },
    {
        icon: Cpu,
        title: "Natural Language Processing",
        description: "Our NLP solutions understand and process human language, enabling intelligent chatbots, sentiment analysis, and more.",
        image: "https://placehold.co/600x400.png",
        dataAiHint: "nlp tech"
    },
    {
        icon: Bot,
        title: "Automation Bots",
        description: "We develop custom automation bots to streamline repetitive tasks, improve efficiency, and reduce operational costs.",
        image: "https://placehold.co/600x400.png",
        dataAiHint: "automation bot"
    }
];

export default function AIPage() {
  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <BrainCircuit className="h-10 w-10 text-primary inline-block" />
          AI at CodeCafe Lab
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We are at the forefront of AI innovation, developing intelligent solutions that redefine possibilities. Explore our AI capabilities and discover how we can help you leverage the power of artificial intelligence.
        </p>
      </section>

      <section>
        <AIProductDiscoveryClient />
      </section>

      <section className="space-y-12">
        <h2 className="text-3xl font-bold text-center">Our AI Capabilities</h2>
        <div className="grid md:grid-cols-3 gap-8">
            {aiFeatures.map(feature => (
                 <Card key={feature.title} className="text-center hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="items-center">
                        <div className="p-4 bg-primary/10 rounded-full inline-block mb-4">
                            <feature.icon className="h-10 w-10 text-primary" />
                        </div>
                        <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Image src={feature.image} alt={feature.title} width={300} height={200} className="rounded-md mb-4 mx-auto object-cover" data-ai-hint={feature.dataAiHint} />
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                 </Card>
            ))}
        </div>
      </section>

      <section className="text-center bg-card p-8 md:p-12 rounded-xl shadow-lg">
        <Bot className="h-12 w-12 text-accent mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Interactive AI Demo (Coming Soon)</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Experience our AI in action! We&apos;re working on an interactive demo that will showcase the power and versatility of our AI solutions. Stay tuned!
        </p>
        <div className="mt-6">
            <Image src="https://placehold.co/800x450.png" alt="AI Demo Placeholder" width={800} height={450} className="rounded-lg mx-auto shadow-md" data-ai-hint="ai demo" />
        </div>
      </section>
    </div>
  );
}
