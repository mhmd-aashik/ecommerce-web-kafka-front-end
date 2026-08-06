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

export interface ApiOrderItem {
  productId: string;
  name: string;
  priceInFils: number;
  quantity: number;
}

export interface ApiOrder {
  id: string;
  userId: string;
  customerEmail: string;
  items: ApiOrderItem[];
  totalInFils: number;
  status: "PENDING_PAYMENT" | "PAID" | "PAYMENT_FAILED";
  paymentId?: string;
  paymentFailureReason?: string;
  createdAt: string;
  updatedAt: string;
}
