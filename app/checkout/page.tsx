"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart.store";
import { useOrderStore } from "@/stores/order.store";
import type { Order } from "@/types/order";

export default function CheckoutPage() {
  const router = useRouter();

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const addOrder = useOrderStore((state) => state.addOrder);

  const totalInFils = items.reduce(
    (sum, item) => sum + item.priceInFils * item.quantity,
    0,
  );

  function placeOrder() {
    if (items.length === 0) {
      return;
    }

    const order: Order = {
      id: crypto.randomUUID(),
      userId: "user-1",
      items,
      total: totalInFils / 100,
      status: "PENDING_PAYMENT",
      createdAt: new Date().toISOString(),
    };

    addOrder(order);
    clearCart();

    router.push("/orders");
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="mt-4">Your cart is empty.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Checkout</h1>

      <section className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Shipping details</h2>

        <div className="mt-4 grid gap-4">
          <input
            type="text"
            placeholder="Full name"
            className="rounded border p-3"
          />

          <input
            type="text"
            placeholder="Address"
            className="rounded border p-3"
          />

          <input
            type="text"
            placeholder="City"
            className="rounded border p-3"
          />
        </div>

        <h2 className="mt-8 text-xl font-semibold">Order summary</h2>

        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between border-b pb-3">
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                AED {((item.priceInFils * item.quantity) / 100).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-xl font-bold">
            AED {(totalInFils / 100).toFixed(2)}
          </span>

          <button
            type="button"
            onClick={placeOrder}
            className="rounded bg-black px-5 py-3 text-white"
          >
            Place mock order
          </button>
        </div>
      </section>
    </main>
  );
}
