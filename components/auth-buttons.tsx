import { auth } from "@/auth";
import { login, logout } from "@/actions/auth.actions";

export async function AuthButtons() {
  const session = await auth();

  if (!session?.user) {
    return (
      <form action={login}>
        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-sm text-white"
        >
          Login
        </button>
      </form>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="text-right">
        <p className="text-sm font-medium">
          {session.user.name ?? session.user.username ?? session.user.email}
        </p>

        <p className="text-xs text-gray-500">{session.user.roles.join(", ")}</p>
      </div>

      <form action={logout}>
        <button type="submit" className="rounded border px-4 py-2 text-sm">
          Logout
        </button>
      </form>
    </div>
  );
}
