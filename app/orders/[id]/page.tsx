import Link from "next/link";
import { notFound } from "next/navigation";

import { RefreshOrderButton } from "@/components/refresh-order-button";
import { apiRequest } from "@/lib/api/api-client";
import type { ApiOrder } from "@/types/order";

interface OrderPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;

  let order: ApiOrder;

  try {
    order = await apiRequest<ApiOrder>(`/orders/me/${id}`);
  } catch {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Order #{order.id.slice(0, 8)}</h1>

        <div className="flex items-center gap-3">
          <OrderStatus status={order.status} />
          <RefreshOrderButton status={order.status} />
        </div>
      </div>

      <section className="mt-6 rounded-lg bg-white p-6 shadow-sm">
        <div className="space-y-3">
          {order.items.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between border-b pb-3"
            >
              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                AED {((item.priceInFils * item.quantity) / 100).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-5 text-right text-xl font-bold">
          Total: AED {(order.totalInFils / 100).toFixed(2)}
        </p>

        {order.paymentFailureReason && (
          <p className="mt-4 rounded bg-red-50 p-3 text-red-700">
            {order.paymentFailureReason}
          </p>
        )}
      </section>

      <Link
        href="/orders"
        className="mt-5 inline-block rounded border px-4 py-2"
      >
        View all orders
      </Link>
    </main>
  );
}

function OrderStatus({ status }: { status: ApiOrder["status"] }) {
  const label = {
    PENDING_PAYMENT: "Processing payment",
    PAID: "Paid",
    PAYMENT_FAILED: "Payment failed",
  }[status];

  return <span className="rounded border px-3 py-1 text-sm">{label}</span>;
}
