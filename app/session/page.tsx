import { auth } from "@/auth";

export default async function SessionPage() {
  const session = await auth();

  if (!session) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="text-3xl font-bold">Session</h1>

        <p className="mt-4">You are not logged in.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Auth.js session</h1>

      <pre className="overflow-x-auto rounded-lg bg-gray-950 p-5 text-sm text-white">
        {JSON.stringify(
          {
            user: session.user,
            hasAccessToken: Boolean(session.accessToken),
          },
          null,
          2,
        )}
      </pre>
    </main>
  );
}
