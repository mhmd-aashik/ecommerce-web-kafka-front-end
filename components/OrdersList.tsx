"use client";

import { useOrderStore } from "@/stores/order.store";

export function OrdersList() {
  const orders = useOrderStore((state) => state.orders);

  if (orders.length === 0) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="mb-6 text-3xl font-bold">My Orders</h1>

        <div className="rounded-lg border bg-white p-8 text-center">
          <p className="text-lg font-medium">No orders found</p>

          <p className="mt-2 text-sm text-gray-500">
            Place your first order to see it here.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold">My Orders</h1>

      <div className="space-y-5">
        {orders.map((order) => (
          <article
            key={order.id}
            className="rounded-lg border bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">Order #{order.id.slice(0, 8)}</h2>

                <p className="mt-1 text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  order.status === "PAID"
                    ? "bg-green-100 text-green-700"
                    : order.status === "PAYMENT_FAILED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>

                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    AED {((item.priceInFils * item.quantity) / 100).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between border-t pt-5">
              <p className="text-sm text-gray-500">
                {order.items.length} item(s)
              </p>

              <p className="text-xl font-bold">AED {order.total.toFixed(2)}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
