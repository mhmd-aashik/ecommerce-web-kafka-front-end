"use client";

import { useCartStore } from "@/stores/cart.store";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Cart</h1>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex items-center justify-between rounded border p-4"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>AED {item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="rounded border px-3 py-1"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="rounded border px-3 py-1"
                >
                  +
                </button>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
            </article>
          ))}

          <div className="text-right text-xl font-bold">
            Total: AED {total.toFixed(2)}
          </div>
        </div>
      )}
    </main>
  );
}
