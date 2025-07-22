"use client";
import AIProductDiscoveryClient from "@/components/ai/AIProductDiscoveryClient";
import { BrainCircuit, Cpu, Bot } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import InteractiveAIDemo from "@/components/ai/InteractiveAIDemo";
import { Separator } from "@/components/ui/separator";

interface AiFeature {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  category: string;
  tags?: string[] | string;
  link?: string;
  featured?: boolean; // Added for featured badge
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
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative text-center py-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl shadow-lg mb-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background: "url('/undraw_design_ewba.svg') center/cover no-repeat",
          }}
        />
        <h1 className="text-5xl font-extrabold mb-4 flex items-center justify-center gap-3 text-primary drop-shadow">
          <BrainCircuit className="h-12 w-12 text-accent" />
          AI at CodeCafe Lab
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
          We are at the forefront of AI innovation, developing intelligent
          solutions that redefine possibilities.
        </p>
        {/* Optional: Add a call-to-action button */}
        {/* <Button size="lg" className="mt-4">Get Started with AI</Button> */}
      </section>

      {/* Product Discovery Section */}
      <section>
        <AIProductDiscoveryClient />
      </section>

      {/* Divider */}
      <div className="container mx-auto py-4">
        <Separator />
      </div>

      {/* AI Features & Innovations */}
      <section className="space-y-12">
        <div className="container mx-auto py-12 space-y-12">
          <section className="text-center">
            <h2 className="text-4xl font-bold mb-4 text-primary">
              AI Features & Innovations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our cutting-edge AI products and solutions, designed to
              empower your business.
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
                    className="flex flex-col transition-shadow duration-200 hover:shadow-2xl group h-full rounded-2xl border-2 border-primary/10"
                  >
                    <CardHeader className="p-0">
                      <div className="relative w-full h-40 rounded-t-2xl overflow-hidden bg-muted">
                        <img
                          src={getSafeImageUrl(feature.image_url)}
                          alt={feature.title}
                          className="p-2 w-full h-full group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => (e.currentTarget.src = fallbackImage)}
                        />
                        {/* Optional: Featured badge */}
                        {feature.featured && (
                          <span className="absolute top-2 right-2 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                            Featured
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-1 p-6">
                      <h3 className="text-xl font-semibold mb-2 line-clamp-2 text-primary">
                        {feature.title}
                      </h3>
                      <div className="mb-2 text-sm text-muted-foreground">
                        <span className="font-medium">Category:</span>{" "}
                        {feature.category}
                      </div>
                      <p className="mb-2 text-sm text-foreground line-clamp-3">
                        {feature.description}
                      </p>
                      {feature.tags && (
                        <div className="mb-2 flex flex-wrap gap-1">
                          {(Array.isArray(feature.tags)
                            ? feature.tags
                            : [feature.tags]
                          ).map((tag, idx) => (
                            <span
                              key={idx}
                              className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs"
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
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </div>
  );
}
