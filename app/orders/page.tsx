"use client";

import { useOrderStore } from "@/stores/order.store";

export default function OrdersPage() {
  const orders = useOrderStore((state) => state.orders);

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">My orders</h1>

      {orders.length === 0 ? (
        <p>You have not placed any orders.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-lg bg-white p-5 shadow-sm"
            >
              <div className="flex justify-between gap-4">
                <div>
                  <h2 className="font-semibold">
                    Order #{order.id.slice(0, 8)}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <span className="rounded bg-yellow-100 px-3 py-1 text-sm">
                  {order.status}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <span>AED {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <p className="mt-4 border-t pt-4 text-right font-bold">
                Total: AED {order.total.toFixed(2)}
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
