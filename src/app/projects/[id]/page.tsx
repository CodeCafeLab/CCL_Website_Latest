
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  Users, 
  Code, 
  Globe, 
  Smartphone, 
  Database,
  Zap,
  Shield,
  TrendingUp,
  PlayCircle,
  Tag,
  Package,
  DollarSign,
  Star,
  ShoppingCart,
  Eye,
  Clock,
  Hash
} from "lucide-react";
import { getProduct } from "@/lib/api";
import type { Product } from "@/types";
import QuoteFormSheet from "@/components/pricing/QuoteFormSheet";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isQuoteSheetOpen, setIsQuoteSheetOpen] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      
      try {
        const response = await getProduct(id as string);
        setProject(response.data);
      } catch (error: any) {
        console.error("Error fetching project:", error);
        setError(error.response?.data?.message || "Failed to load project details");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const getSafeImageUrl = (imageUrl: string | undefined) => {
    if (!imageUrl || imageUrl.trim() === "" || imageUrl.includes("example.com")) {
      return "/fallback.png";
    }
    return imageUrl;
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(parseFloat(price));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
        <p className="text-muted-foreground mb-6">
          {error || "The project you're looking for doesn't exist."}
        </p>
        <Button asChild>
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <Button asChild variant="outline" className="mb-6">
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </div>

      <section className="space-y-6">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg md:order-last">
            <Image
              src={getSafeImageUrl(project.image_url)}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/800x600/6366f1/ffffff?text=Project+Image';
              }}
            />
          </div>
          <div className="space-y-4 md:order-first">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {project.is_featured && (
                  <Badge variant="default" className="bg-yellow-500 text-yellow-900">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                  {project.status}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.name}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                {project.short_description}
              </p>
            </div>
            
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 pt-4">
              <div className="text-2xl font-bold text-primary">
                {formatPrice(project.price)}
              </div>
              {project.discount_price && parseFloat(project.discount_price) > 0 && (
                <div className="text-lg text-muted-foreground line-through">
                  {formatPrice(project.discount_price)}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button onClick={() => setIsQuoteSheetOpen(true)} className="w-full sm:w-auto">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Get Quote
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href="/contact">
                  <Eye className="mr-2 h-4 w-4" />
                  Request Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Project Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </CardContent>
          </Card>

          {project.gallery && project.gallery.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  Project Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.gallery.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={getSafeImageUrl(image)}
                        alt={`${project.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5 text-primary" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">SKU:</span>
                    <span className="text-sm text-muted-foreground">{project.sku}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Brand:</span>
                    <span className="text-sm text-muted-foreground">{project.brand}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Category:</span>
                    <span className="text-sm text-muted-foreground">{project.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Stock:</span>
                    <span className="text-sm text-muted-foreground">{project.stock} units</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Weight:</span>
                    <span className="text-sm text-muted-foreground">{project.weight} kg</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Dimensions:</span>
                    <span className="text-sm text-muted-foreground">
                      {project.dimensions.width} × {project.dimensions.height} × {project.dimensions.depth} cm
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>Status:</strong> {project.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>Created:</strong> {formatDate(project.created_at)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>Updated:</strong> {formatDate(project.updated_at)}
                </span>
              </div>
              {project.is_featured && (
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">
                    <strong>Featured Project</strong>
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl font-bold text-primary">
                {formatPrice(project.price)}
              </div>
              {project.discount_price && parseFloat(project.discount_price) > 0 && (
                <div className="text-sm text-muted-foreground line-through">
                  Original: {formatPrice(project.discount_price)}
                </div>
              )}
              <Button className="w-full" onClick={() => setIsQuoteSheetOpen(true)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Get Quote
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={() => setIsQuoteSheetOpen(true)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Get Quote
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/contact">
                  <Eye className="mr-2 h-4 w-4" />
                  Request Demo
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/contact">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Get Similar Project
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      <QuoteFormSheet
        isOpen={isQuoteSheetOpen}
        onOpenChange={setIsQuoteSheetOpen}
      />
    </div>
  );
}
