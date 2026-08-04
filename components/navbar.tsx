"use client";

import Link from "next/link";
import { useCartStore } from "@/stores/cart.store";

export function Navbar() {
  const totalItems = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">
          Kafka Shop
        </Link>

        <div className="flex items-center gap-5">
          <Link href="/products">Products</Link>

          <Link href="/orders">Orders</Link>

          <Link href="/admin/products">Admin</Link>

          <Link href="/cart" className="font-medium">
            Cart ({totalItems})
          </Link>
        </div>
      </nav>
    </header>
  );
}
