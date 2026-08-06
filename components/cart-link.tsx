"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useCartStore } from "@/stores/cart.store";

export function CartLink() {
  const [mounted, setMounted] = useState(false);

  const items = useCartStore((state) => state.items);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const quantity = items.reduce((total, item) => total + item.quantity, 0);

  return <Link href="/cart">Cart ({mounted ? quantity : 0})</Link>;
}
