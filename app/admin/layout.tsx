import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const isAdmin = session.user.roles.includes("admin");

  if (!isAdmin) {
    redirect("/unauthorized");
  }

  return children;
}
