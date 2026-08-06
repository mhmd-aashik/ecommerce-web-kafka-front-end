import Link from "next/link";

import { apiRequest } from "@/lib/api/api-client";
import type { Product } from "@/types/product";
import { formatAedFromFils } from "@/types/product";

export default async function AdminProductsPage() {
  const products = await apiRequest<Product[]>("/products", {
    authenticated: false,
  });

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Admin</p>
          <h1 className="text-3xl font-bold">Products</h1>
        </div>

        <Link
          href="/admin/products/new"
          className="rounded bg-black px-5 py-3 text-white"
        >
          Create product
        </Link>
      </div>

      {products.length === 0 ? (
        <p>No products yet. Create your first product.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">ID</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <div className="font-medium">{product.name}</div>
                    <div className="mt-1 text-gray-500 line-clamp-1">
                      {product.description}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    AED {formatAedFromFils(product.priceInFils)}
                  </td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">
                    {product.id.slice(0, 8)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
