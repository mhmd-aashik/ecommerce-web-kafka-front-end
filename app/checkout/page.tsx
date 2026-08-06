"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createOrder } from "@/actions/order.actions";
import { useCartStore } from "@/stores/cart.store";

export default function CheckoutPage() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);

  const clearCart = useCartStore((state) => state.clearCart);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");

  const totalInFils = items.reduce(
    (total, item) => total + item.priceInFils * item.quantity,
    0,
  );

  async function handlePlaceOrder() {
    if (items.length === 0 || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const order = await createOrder({
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      });

      clearCart();

      router.push(`/orders/${order.id}`);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to place the order",
      );

      setIsSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="text-3xl font-bold">Checkout</h1>

        <section className="mt-6 rounded-lg bg-white p-8 text-center shadow-sm">
          <p>Your cart is empty.</p>

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
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <section className="mt-6 rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Order summary</h2>

        <div className="mt-5 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between border-b pb-4">
              <div>
                <p className="font-medium">{item.name}</p>

                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <span>
                AED {((item.priceInFils * item.quantity) / 100).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-lg font-medium">Total</span>

          <strong className="text-2xl">
            AED {(totalInFils / 100).toFixed(2)}
          </strong>
        </div>

        {error && (
          <div className="mt-5 rounded border border-red-200 bg-red-50 p-3 text-red-700">
            {error}
          </div>
        )}

        <button
          type="button"
          disabled={isSubmitting}
          onClick={handlePlaceOrder}
          className="mt-6 w-full rounded bg-black px-5 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Placing order..." : "Place order"}
        </button>

        <Link
          href="/cart"
          className="mt-4 block text-center text-sm text-gray-600"
        >
          Return to cart
        </Link>
      </section>
    </main>
  );
}
