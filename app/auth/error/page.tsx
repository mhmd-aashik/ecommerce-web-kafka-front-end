import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <section className="rounded-xl border bg-white p-8 text-center">
        <h1 className="text-3xl font-bold">Authentication failed</h1>

        <p className="mt-4 text-gray-600">
          Confirm that Keycloak is running and that the client ID, client
          secret, issuer and redirect URI are correct.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded bg-black px-5 py-3 text-white"
        >
          Return home
        </Link>
      </section>
    </main>
  );
}
