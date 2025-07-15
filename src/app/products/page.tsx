import type { Metadata } from "next";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types";
import { apiClient } from "@/lib/api";

export const metadata: Metadata = {
  title: "Our Products",
  description:
    "Discover innovative in-house tools, SaaS, and platforms developed by CodeCafe Lab.",
};

export default async function ProductsPage() {
  let products: Product[] = [];
  try {
    const res = await apiClient.get("/products");
    products = res.data; // <-- Axios puts the response data here
  } catch (e) {
    products = [];
  }

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
          {products.map((product) => (
            <div key={product.id} id={String(product.id)} className="scroll-mt-20">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
