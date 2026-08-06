"use server";

import { revalidatePath } from "next/cache";

import { apiRequest } from "@/lib/api/api-client";
import type { ApiOrder } from "@/types/order";

interface CreateOrderInput {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}

export async function createOrder(input: CreateOrderInput): Promise<ApiOrder> {
  const order = await apiRequest<ApiOrder>("/orders", {
    method: "POST",
    body: JSON.stringify(input),
  });

  revalidatePath("/orders");

  return order;
}
