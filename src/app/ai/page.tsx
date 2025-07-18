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
                  <div
                    key={feature.id}
                    className="p-6 bg-card rounded-lg shadow flex flex-col"
                  >
                    <img
                      src={getSafeImageUrl(feature.image_url)}
                      alt={feature.title}
                      className="w-full h-48 object-cover rounded mb-4 bg-muted"
                      onError={(e) => (e.currentTarget.src = fallbackImage)}
                    />
                    <h2 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h2>
                    <div className="mb-2 text-sm text-muted-foreground">
                      <span className="font-medium">Category:</span>{" "}
                      {feature.category}
                    </div>
                    <p className="mb-2">{feature.description}</p>
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
                    {feature.link && (
                      <a
                        href={feature.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto text-accent underline text-sm"
                      >
                        Learn More
                      </a>
                    )}
                  </div>
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
