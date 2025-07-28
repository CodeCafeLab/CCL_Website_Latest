
"use client";
import AIProductDiscoveryClient from "@/components/ai/AIProductDiscoveryClient";
import { BrainCircuit, Cpu, Bot, Search, Filter, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState, useMemo } from "react";
import InteractiveAIDemo from "@/components/ai/InteractiveAIDemo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api";


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

const fallbackImage = "https://placehold.co/600x400.png";

const getSafeImageUrl = (url?: string) =>
  url && url !== "" ? url : fallbackImage;

const FeatureSkeleton = () => (
  <div className="p-6 bg-card rounded-lg shadow flex flex-col border border-border/10">
    <Skeleton className="w-full h-40 rounded mb-4 bg-muted" />
    <Skeleton className="h-6 w-3/4 mb-2 bg-muted" />
    <Skeleton className="h-4 w-1/2 mb-4 bg-muted" />
    <Skeleton className="h-10 w-full mb-4 bg-muted" />
    <div className="flex gap-2 mb-4">
      <Skeleton className="h-5 w-16 rounded-full bg-muted" />
      <Skeleton className="h-5 w-20 rounded-full bg-muted" />
    </div>
    <Skeleton className="h-10 w-28 mt-auto bg-muted" />
  </div>
);


export default function AIPage() {
  const [aiFeatures, setAiFeatures] = useState<AiFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const fetchFeatures = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get("/ai");
        setAiFeatures(res.data);
      } catch (e) {
        setAiFeatures([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatures();
  }, []);

  const categories = useMemo(() => {
    const allCategories = new Set(aiFeatures.map(f => f.category));
    return ["all", ...Array.from(allCategories)];
  }, [aiFeatures]);

  const filteredFeatures = useMemo(() => {
    return aiFeatures.filter(feature => {
      const matchesCategory = selectedCategory === "all" || feature.category === selectedCategory;
      const matchesSearch =
        feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feature.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [aiFeatures, searchTerm, selectedCategory]);

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative text-center py-16 md:py-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl shadow-lg mb-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background: "url('/undraw_design_ewba.svg') center/cover no-repeat",
          }}
        />
        <h1 className="text-2xl md:text-5xl font-extrabold mb-4 flex items-center justify-center gap-3 text-primary drop-shadow">
          <BrainCircuit className="h-10 w-10 md:h-12 md:w-12 text-accent" />
          AI at CodeCafe Lab
        </h1>
        <p className="text-sm md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 px-4">
          We are at the forefront of AI innovation, developing intelligent
          solutions that redefine possibilities. Explore our AI capabilities and
          discover how we can help you leverage the power of artificial
          intelligence.
        </p>
        {/* Optional: Add a call-to-action button */}
        {/* <Button size="lg" className="mt-4">Get Started with AI</Button> */}
      </section>

      {/* Product Discovery Section */}
      <section>
        <AIProductDiscoveryClient />
      </section>

      {/* AI Features & Innovations Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">AI Features & Innovations</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Explore our cutting-edge AI products and solutions, designed to
            empower your business with the latest in artificial intelligence
            and machine learning.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search AI features..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => <FeatureSkeleton key={index} />)
          ) : filteredFeatures.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground col-span-full">
              No AI features found matching your criteria.
            </div>
          ) : (
            filteredFeatures.map((feature) => (
              <Link key={feature.id} href={`/ai/${feature.id}`} className="block h-full group">
                <div
                  className="p-6 bg-card rounded-lg shadow flex flex-col border border-border/10 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 h-full"
                >
                  <img
                    src={getSafeImageUrl(feature.image_url)}
                    alt={feature.title}
                    className="w-full h-40 object-cover rounded-md mb-4 bg-muted"
                    onError={(e) => (e.currentTarget.src = fallbackImage)}
                  />
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <Badge variant="outline" className="mb-4 w-fit">{feature.category}</Badge>

                  <p className="mb-4 text-sm text-muted-foreground flex-grow line-clamp-3">{feature.description}</p>

                  {feature.tags && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {(Array.isArray(feature.tags)
                        ? feature.tags
                        : [feature.tags]
                      ).map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <Button asChild className="mt-auto w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {/* The parent Link component makes this redundant, but we keep it for visual cue */}
                    <span className="flex items-center justify-center">
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Button>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
