import { ProductCard } from "@/components/product-card";
import { apiRequest } from "@/lib/api/api-client";
import type { Product } from "@/types/product";

export default async function ProductsPage() {
  const products = await apiRequest<Product[]>("/products", {
    authenticated: false,
  });

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
