import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { AddToCartButton } from "@/components/add-to-cart-button";

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <section className="grid gap-8 rounded-xl bg-white p-8 shadow-sm md:grid-cols-2">
        <div className="flex min-h-80 items-center justify-center rounded-lg bg-gray-100">
          <span className="text-gray-500">Product image</span>
        </div>

        <div>
          <p className="text-sm text-gray-500">Product ID: {product.id}</p>

          <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>

          <p className="mt-4 text-gray-600">{product.description}</p>

          <p className="mt-6 text-2xl font-bold">
            AED {product.price.toFixed(2)}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {product.stock} items available
          </p>

          <div className="mt-6">
            <AddToCartButton product={product} />
          </div>
        </div>
      </section>
    </main>
  );
}
