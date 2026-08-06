"use client";

import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

import type { OrderStatus } from "@/types/order";

interface RefreshOrderButtonProps {
  status: OrderStatus;
}

export function RefreshOrderButton({ status }: RefreshOrderButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isWaitingForPayment = status === "PENDING_PAYMENT";

  useEffect(() => {
    if (!isWaitingForPayment) {
      return;
    }

    const intervalId = window.setInterval(() => {
      startTransition(() => {
        router.refresh();
      });
    }, 2000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isWaitingForPayment, router]);

  function refresh() {
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={refresh}
      disabled={isPending}
      className="rounded border px-4 py-2"
    >
      {isPending
        ? "Checking..."
        : isWaitingForPayment
          ? "Waiting for payment..."
          : "Refresh status"}
    </button>
  );
}
