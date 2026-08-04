import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { OrdersList } from "@/components/OrdersList";

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/orders");
  }

  return <OrdersList />;
}
