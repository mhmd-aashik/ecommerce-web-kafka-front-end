import Link from "next/link";

import { auth } from "@/auth";
import { AuthControls } from "@/components/auth-controls";
import { CartNavigation } from "@/components/cart-navigation";

export async function Navbar() {
  const session = await auth();

  const isLoggedIn = Boolean(session?.user);
  const isAdmin = session?.roles.includes("admin") ?? false;

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-5 p-4">
        <Link href="/" className="text-xl font-bold">
          Kafka Shop
        </Link>

        <div className="flex items-center gap-5">
          <CartNavigation />

          {isLoggedIn && <Link href="/profile">Profile</Link>}

          {isAdmin && <Link href="/admin/products">Admin</Link>}

          <AuthControls />
        </div>
      </nav>
    </header>
  );
}
