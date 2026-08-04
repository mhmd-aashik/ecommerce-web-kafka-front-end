import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <section className="rounded-xl bg-white p-10 shadow-sm">
        <p className="mb-3 text-sm font-semibold uppercase text-gray-500">
          NestJS and Kafka study project
        </p>

        <h1 className="max-w-2xl text-4xl font-bold">
          Learn event-driven e-commerce with NestJS, Kafka and Next.js
        </h1>

        <p className="mt-4 max-w-2xl text-gray-600">
          Browse products, place a mock order and later observe how the order,
          payment, notification and analytics services communicate through
          Kafka.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/products"
            className="rounded bg-black px-5 py-3 text-white"
          >
            Browse products
          </Link>

          <Link href="/admin/products" className="rounded border px-5 py-3">
            Admin products
          </Link>
        </div>
      </section>
    </main>
  );
}
