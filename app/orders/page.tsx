import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { apiRequest } from "@/lib/api/api-client";
import type { ApiOrder } from "@/types/order";

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/orders");
  }

  const orders = await apiRequest<ApiOrder[]>("/orders/me");

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

                <span className="rounded border px-3 py-1 text-sm">
                  {order.status}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <span>
                      AED{" "}
                      {((item.priceInFils * item.quantity) / 100).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-4 border-t pt-4 text-right font-bold">
                Total: AED {(order.totalInFils / 100).toFixed(2)}
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
