"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/types';
import { Layers, PlayCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            data-ai-hint={product.dataAiHint}
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
           <CardTitle className="absolute bottom-4 left-4 text-2xl font-bold text-white group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardDescription className="mb-4 text-sm line-clamp-3">{product.description}</CardDescription>
        <div className="flex items-center text-xs text-muted-foreground gap-2">
            <Layers className="h-4 w-4 text-accent" />
            <span>Stack: {product.stack}</span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Link href={product.demoUrl}>
            <PlayCircle className="mr-2 h-4 w-4" /> View Demo
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
