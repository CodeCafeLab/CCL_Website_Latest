"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  ArrowRight,
  Layers,
  PlayCircle,
  ExternalLink,
  Star,
  Tag,
  DollarSign,
} from "lucide-react";
import { getProducts } from "@/lib/api";
import type { Product } from "@/types";

export default function ProjectsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.short_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  // Helper function to get a safe image URL
  const getSafeImageUrl = (imageUrl: string | undefined) => {
    if (!imageUrl || imageUrl === 'https://example.com/mug.jpg' || imageUrl.includes('example.com')) {
      return 'https://placehold.co/600x400/6366f1/ffffff?text=Project+Image';
    }
    return imageUrl;
  };

  // Helper function to format price
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(parseFloat(price));
  };

  if (loading) {
    return (
      <div className="space-y-12">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">Our Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of innovative projects and solutions.
          </p>
        </section>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Our Projects</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our portfolio of innovative projects and solutions crafted
          with cutting-edge technology and creative design.
        </p>
      </section>

      {/* Search and Filter Section */}
      <section className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects by name, description, category, or brand..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* Projects Grid */}
      <section>
        {filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1"
              >
                <CardHeader className="p-0">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={getSafeImageUrl(product.image_url)}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/600x400/6366f1/ffffff?text=Project+Image';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 left-4 flex gap-2">
                      {product.is_featured && (
                        <Badge variant="default" className="bg-yellow-500 text-yellow-900">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                        {product.status}
                      </Badge>
                    </div>
                    <CardTitle className="absolute bottom-4 left-4 text-2xl font-bold text-white group-hover:text-primary transition-colors">
                      {product.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardDescription className="mb-4 text-sm line-clamp-3">
                    {product.short_description || product.description}
                  </CardDescription>
                  
                  {/* Category and Brand */}
                  <div className="flex items-center text-xs text-muted-foreground gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Tag className="h-4 w-4 text-accent" />
                      <span>{product.category}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Layers className="h-4 w-4 text-accent" />
                      <span>{product.brand}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.discount_price && parseFloat(product.discount_price) > 0 && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.discount_price)}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.tags.slice(0, 3).map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {product.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{product.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-6 pt-0 space-x-2">
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    <Link href={`/projects/${product.id}`}>
                      <ArrowRight className="mr-2 h-4 w-4" /> View Details
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="icon"
                    className="group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
                  >
                    <Link href="/contact">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              {searchTerm
                ? `No projects match "${searchTerm}". Try a different search term.`
                : "No projects available at the moment."}
            </p>
            {searchTerm && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </Button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
