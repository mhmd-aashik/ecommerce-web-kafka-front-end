import type { CartItem } from "@/stores/cart.store";

export type OrderStatus = "PENDING_PAYMENT" | "PAID" | "PAYMENT_FAILED";

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}
