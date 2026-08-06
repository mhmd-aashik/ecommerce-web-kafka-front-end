import Link from "next/link";

import type { Product } from "@/types/product";
import { formatAedFromFils } from "@/types/product";
import { AddToCartButton } from "./add-to-cart-button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="rounded-lg border p-5">
      <h2 className="text-xl font-semibold">{product.name}</h2>

      <p className="mt-2 text-gray-600">{product.description}</p>

      <p className="mt-4 text-lg font-bold">
        AED {formatAedFromFils(product.priceInFils)}
      </p>

      <p className="mb-4 text-sm text-gray-500">Stock: {product.stock}</p>

      <div className="flex gap-3">
        <Link
          href={`/products/${product.id}`}
          className="rounded border px-4 py-2"
        >
          View
        </Link>

        <AddToCartButton product={product} />
      </div>
    </article>
  );
}
