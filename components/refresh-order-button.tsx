"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function RefreshOrderButton() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

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
      {isPending ? "Checking..." : "Check payment status"}
    </button>
  );
}
