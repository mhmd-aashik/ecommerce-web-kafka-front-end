"use client";

import { useCartStore } from "@/stores/cart.store";
import type { Product } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  const isOutOfStock = product.stock <= 0;

  return (
    <button
      type="button"
      disabled={isOutOfStock}
      onClick={() => addItem(product)}
      className="rounded bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isOutOfStock ? "Out of stock" : "Add to cart"}
    </button>
  );
}
