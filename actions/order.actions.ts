"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { apiRequest } from "@/lib/api/api-client";

interface CreateOrderInput {
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}

export async function createOrder(input: CreateOrderInput) {
  const order = await apiRequest<{
    id: string;
  }>("/orders", {
    method: "POST",
    body: JSON.stringify(input),
  });

  revalidatePath("/orders");

  redirect(`/orders/${order.id}`);
}
