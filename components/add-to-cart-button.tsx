"use client";

import type { Product } from "@/types/product";
import { useCartStore } from "@/stores/cart.store";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      type="button"
      onClick={() => addItem(product)}
      className="rounded bg-black px-4 py-2 text-white"
    >
      Add to cart
    </button>
  );
}
