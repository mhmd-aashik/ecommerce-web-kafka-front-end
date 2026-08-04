import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <section className="rounded-xl border bg-white p-8 text-center">
        <p className="text-sm font-semibold uppercase text-red-600">
          Access denied
        </p>

        <h1 className="mt-3 text-3xl font-bold">You do not have permission</h1>

        <p className="mt-4 text-gray-600">This page requires the admin role.</p>

        <Link
          href="/products"
          className="mt-6 inline-block rounded bg-black px-5 py-3 text-white"
        >
          Return to products
        </Link>
      </section>
    </main>
  );
}
