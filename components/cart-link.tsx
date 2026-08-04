"use client";

import Link from "next/link";
import { useCartStore } from "@/stores/cart.store";

export function CartLink() {
  const totalItems = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <Link href="/cart" className="font-medium">
      Cart ({totalItems})
    </Link>
  );
}
