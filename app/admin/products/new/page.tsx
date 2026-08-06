"use client";

import { type ChangeEvent, type FormEvent, useState, useTransition } from "react";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import { createProduct } from "@/actions/product.actions";

interface ProductFormState {
  name: string;
  description: string;
  price: string;
  stock: string;
}

const initialFormState: ProductFormState = {
  name: "",
  description: "",
  price: "",
  stock: "",
};

export default function CreateProductPage() {
  const [form, setForm] = useState<ProductFormState>(initialFormState);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!form.name.trim()) {
      setError("Product name is required.");
      return;
    }

    if (!form.description.trim()) {
      setError("Product description is required.");
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      setError("Price must be greater than zero.");
      return;
    }

    if (!Number.isInteger(stock) || stock < 0) {
      setError("Stock must be zero or a positive integer.");
      return;
    }

    startTransition(async () => {
      try {
        await createProduct({
          name: form.name.trim(),
          description: form.description.trim(),
          priceInFils: Math.round(price * 100),
          stock,
        });
      } catch (err) {
        if (isRedirectError(err)) {
          throw err;
        }

        setError(
          err instanceof Error ? err.message : "Failed to create product.",
        );
      }
    });
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-500">Admin</p>

        <h1 className="text-3xl font-bold">Create product</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-lg bg-white p-6 shadow-sm"
      >
        {error && (
          <div className="rounded border border-red-200 bg-red-50 p-3 text-red-700">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="name" className="mb-2 block font-medium">
            Product name
          </label>

          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded border p-3"
            placeholder="Mechanical Keyboard"
            disabled={isPending}
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="min-h-32 w-full rounded border p-3"
            placeholder="Describe the product"
            disabled={isPending}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="price" className="mb-2 block font-medium">
              Price (AED)
            </label>

            <input
              id="price"
              name="price"
              type="number"
              min="0.01"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              className="w-full rounded border p-3"
              placeholder="250"
              disabled={isPending}
            />
          </div>

          <div>
            <label htmlFor="stock" className="mb-2 block font-medium">
              Stock
            </label>

            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              step="1"
              value={form.stock}
              onChange={handleChange}
              className="w-full rounded border p-3"
              placeholder="10"
              disabled={isPending}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-black px-5 py-3 text-white disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Save product"}
        </button>
      </form>
    </main>
  );
}
