import { auth, signIn, signOut } from "@/auth";

export async function AuthButton() {
  const session = await auth();

  if (!session) {
    return (
      <form
        action={async () => {
          "use server";
          await signIn("keycloak");
        }}
      >
        <button
          type="submit"
          className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          Login
        </button>
      </form>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="text-sm font-semibold">{session.user?.name}</p>

        <p className="text-xs text-gray-500">{session.user?.email}</p>
      </div>

      <form
        action={async () => {
          "use server";
          await signOut({
            redirectTo: "/",
          });
        }}
      >
        <button
          type="submit"
          className="rounded-md border px-4 py-2 hover:bg-gray-100"
        >
          Logout
        </button>
      </form>
    </div>
  );
}
