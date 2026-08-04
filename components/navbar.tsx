import Link from "next/link";
import { CartLink } from "@/components/cart-link";
import { AuthButtons } from "@/components/auth-buttons";
import { auth } from "@/auth";

export async function Navbar() {
  const session = await auth();

  const isAdmin = session?.user.roles.includes("admin") ?? false;

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 p-4">
        <Link href="/" className="text-xl font-bold">
          Kafka Shop
        </Link>

        <div className="flex items-center gap-5">
          <Link href="/products">Products</Link>

          {session?.user && <Link href="/orders">Orders</Link>}

          {isAdmin && <Link href="/admin/products">Admin</Link>}

          <CartLink />

          <AuthButtons />
        </div>
      </nav>
    </header>
  );
}
