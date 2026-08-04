"use client";

import { create } from "zustand";
import type { Order } from "@/types/order";

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],

  addOrder: (order) =>
    set((state) => ({
      orders: [order, ...state.orders],
    })),
}));
