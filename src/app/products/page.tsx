
"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types";
import { apiClient } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => (
    <div className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out border rounded-lg">
        <Skeleton className="w-full aspect-video bg-muted" />
        <div className="p-6 flex-grow">
            <Skeleton className="h-6 w-3/4 mb-4 bg-muted" />
            <Skeleton className="h-4 w-full bg-muted" />
            <Skeleton className="h-4 w-full mt-2 bg-muted" />
            <Skeleton className="h-4 w-2/3 mt-2 mb-4 bg-muted" />
        </div>
        <div className="p-6 pt-0">
            <Skeleton className="h-10 w-full bg-muted" />
        </div>
    </div>
);


export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get("/products")
        .then((res) => setProducts(res.data))
        .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our suite of innovative products designed to solve complex
          challenges and drive efficiency. Each product is crafted with
          precision and powered by cutting-edge technology.
        </p>
      </section>

      <section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
             Array.from({ length: 6 }).map((_, index) => <ProductCardSkeleton key={index} />)
          ) : products.length > 0 ? (
            products.map((product) => (
                <div key={product.id} id={String(product.id)} className="scroll-mt-20">
                  <ProductCard product={product} />
                </div>
              ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
                No products found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
