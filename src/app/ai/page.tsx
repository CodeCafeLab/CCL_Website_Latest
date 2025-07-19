"use client";
import AIProductDiscoveryClient from "@/components/ai/AIProductDiscoveryClient";
import { BrainCircuit, Cpu, Bot } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import InteractiveAIDemo from "@/components/ai/InteractiveAIDemo";

interface AiFeature {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  category: string;
  tags?: string[] | string;
  link?: string;
}

const fallbackImage = "/fallback.png";

const getSafeImageUrl = (url?: string) =>
  url && url !== "" ? url : fallbackImage;

export default function AIPage() {
  const [aiFeatures, setAiFeatures] = useState<AiFeature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/ai");
        const data = await res.json();
        setAiFeatures(data);
      } catch (e) {
        setAiFeatures([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatures();
  }, []);

  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <BrainCircuit className="h-10 w-10 text-primary inline-block" />
          AI at CodeCafe Lab
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We are at the forefront of AI innovation, developing intelligent
          solutions that redefine possibilities. Explore our AI capabilities and
          discover how we can help you leverage the power of artificial
          intelligence.
        </p>
      </section>

      <section>
        <AIProductDiscoveryClient />
      </section>

      <section className="space-y-12">
        <div className="container mx-auto py-12 space-y-12">
          <section className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              AI Features & Innovations
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our cutting-edge AI products and solutions, designed to
              empower your business with the latest in artificial intelligence
              and machine learning.
            </p>
          </section>
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : aiFeatures.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No AI features found.
            </div>
          ) : (
            <section>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {aiFeatures.map((feature) => (
                  <Card
                    key={feature.id}
                    className="flex flex-col transition-shadow duration-200 hover:shadow-xl group h-full"
                  >
                    <CardHeader className="p-0">
                      <div className="relative w-full h-40 rounded-t-lg overflow-hidden bg-muted">
                        <img
                          src={getSafeImageUrl(feature.image_url)}
                          alt={feature.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => (e.currentTarget.src = fallbackImage)}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-1 p-6">
                      <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                        {feature.title}
                      </h2>
                      <div className="mb-2 text-sm text-muted-foreground">
                        <span className="font-medium">Category:</span>{" "}
                        {feature.category}
                      </div>
                      <p className="mb-2 text-sm text-foreground line-clamp-3">
                        {feature.description}
                      </p>
                      {feature.tags && (
                        <div className="mb-2">
                          <span className="font-medium">Tags:</span>{" "}
                          {(Array.isArray(feature.tags)
                            ? feature.tags
                            : [feature.tags]
                          ).map((tag, idx) => (
                            <span
                              key={idx}
                              className="inline-block bg-primary/10 text-primary px-2 py-1 rounded mr-1 text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-auto flex flex-col gap-2 w-full">
                        <a
                          href={`/ai/${feature.id}`}
                          className="w-full mt-2 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-green-600 text-center font-semibold transition block"
                        >
                          Read More
                        </a>
                        {feature.link && (
                          <a
                            href={feature.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-green-600 text-center font-semibold transition block"
                          >
                            Visit Website
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>

      <section>
        <InteractiveAIDemo />
      </section>
    </div>
  );
}
