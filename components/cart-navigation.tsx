"use client";

import Link from "next/link";
import { useCartStore } from "@/stores/cart.store";

export function CartNavigation() {
  const totalItems = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <>
      <Link href="/products">Products</Link>
      <Link href="/orders">Orders</Link>

      <Link href="/cart" className="font-medium">
        Cart ({totalItems})
      </Link>
    </>
  );
}
