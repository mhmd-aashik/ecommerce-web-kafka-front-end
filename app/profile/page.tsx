import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { apiRequest } from "@/lib/api/api-client";

interface ProfileResponse {
  message: string;
  user: {
    id: string;
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    roles: string[];
  };
}

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user || session.error === "RefreshAccessTokenError") {
    redirect("/api/auth/signin?callbackUrl=/profile");
  }

  const result = await apiRequest<ProfileResponse>("/auth/me");

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold">API Gateway profile</h1>

      <section className="mt-6 rounded-lg bg-white p-6 shadow-sm">
        <p>
          <strong>User ID:</strong> {result.user.id}
        </p>

        <p className="mt-2">
          <strong>Username:</strong> {result.user.username ?? "Not provided"}
        </p>

        <p className="mt-2">
          <strong>Full Name:</strong>{" "}
          {result.user.firstName || result.user.lastName
            ? `${result.user.firstName ?? ""} ${result.user.lastName ?? ""}`.trim()
            : "Not provided"}
        </p>

        <p className="mt-2">
          <strong>Email:</strong> {result.user.email ?? "Not provided"}
        </p>

        <p className="mt-2">
          <strong>Roles:</strong> {result.user.roles.join(", ")}
        </p>
      </section>
    </main>
  );
}
