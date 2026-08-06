"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { apiRequest } from "@/lib/api/api-client";

interface CreateProductInput {
  name: string;
  description: string;
  priceInFils: number;
  stock: number;
}

export async function createProduct(input: CreateProductInput) {
  await apiRequest("/products", {
    method: "POST",
    body: JSON.stringify(input),
  });

  revalidatePath("/products");
  revalidatePath("/admin/products");

  redirect("/admin/products");
}
