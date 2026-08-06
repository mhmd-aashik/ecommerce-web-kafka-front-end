"use client";

import Link from "next/link";

import { useCartStore } from "@/stores/cart.store";

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  const removeItem = useCartStore((state) => state.removeItem);

  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const totalInFils = items.reduce(
    (total, item) => total + item.priceInFils * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="text-3xl font-bold">Shopping cart</h1>

        <section className="mt-6 rounded-lg bg-white p-8 text-center shadow-sm">
          <p className="text-gray-600">Your cart is empty.</p>

          <Link
            href="/products"
            className="mt-5 inline-block rounded bg-black px-5 py-3 text-white"
          >
            Browse products
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold">Shopping cart</h1>

      <section className="mt-6 space-y-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="flex flex-col justify-between gap-5 rounded-lg bg-white p-5 shadow-sm sm:flex-row sm:items-center"
          >
            <div>
              <h2 className="font-semibold">{item.name}</h2>

              <p className="mt-1 text-gray-600">
                AED {(item.priceInFils / 100).toFixed(2)}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Available stock: {item.stock}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="rounded border px-3 py-1"
              >
                −
              </button>

              <span className="min-w-6 text-center">{item.quantity}</span>

              <button
                type="button"
                disabled={item.quantity >= item.stock}
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="rounded border px-3 py-1 disabled:opacity-40"
              >
                +
              </button>

              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="ml-3 text-sm text-red-600"
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-lg bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Total</span>

          <strong className="text-2xl">
            AED {(totalInFils / 100).toFixed(2)}
          </strong>
        </div>

        <Link
          href="/checkout"
          className="mt-6 block rounded bg-black px-5 py-3 text-center text-white"
        >
          Continue to checkout
        </Link>
      </section>
    </main>
  );
}
