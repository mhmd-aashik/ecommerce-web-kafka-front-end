"use client";

import { ProductCard } from "@/components/product-card";
import { useProductStore } from "@/stores/product.store";

export default function ProductsPage() {
  const products = useProductStore((state) => state.products);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Products</h1>

      {products.length === 0 ? (
        <p>No products are available.</p>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </main>
  );
}
