import { redirect } from "next/navigation";
import { auth } from "@/auth";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/admin/products");
  }

  if (!session.roles.includes("admin")) {
    redirect("/products");
  }

  return children;
}
