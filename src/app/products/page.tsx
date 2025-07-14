import type { Metadata } from 'next';
import ProductCard from '@/components/products/ProductCard';
import { PRODUCTS_DATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Products',
  description: 'Discover innovative in-house tools, SaaS, and platforms developed by CodeCafe Lab.',
};

export default function ProductsPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Our Products</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our suite of innovative products designed to solve complex challenges and drive efficiency. Each product is crafted with precision and powered by cutting-edge technology.
        </p>
      </section>

      <section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS_DATA.map((product) => (
            <div key={product.id} id={product.id} className="scroll-mt-20"> {/* Added for linking from homepage */}
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
