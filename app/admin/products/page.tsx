"use client";

import Link from "next/link";
import { useProductStore } from "@/stores/product.store";

export default function AdminProductsPage() {
  const products = useProductStore((state) => state.products);
  const removeProduct = useProductStore((state) => state.removeProduct);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">Admin</p>

          <h1 className="text-3xl font-bold">Manage products</h1>
        </div>

        <Link
          href="/admin/products/new"
          className="rounded bg-black px-5 py-3 text-white"
        >
          Create product
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="p-4">
                  <p className="font-medium">{product.name}</p>

                  <p className="mt-1 max-w-md text-sm text-gray-500">
                    {product.description}
                  </p>
                </td>

                <td className="p-4">AED {product.price.toFixed(2)}</td>

                <td className="p-4">{product.stock}</td>

                <td className="p-4">
                  <button
                    type="button"
                    onClick={() => removeProduct(product.id)}
                    className="rounded border border-red-300 px-3 py-2 text-sm text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
