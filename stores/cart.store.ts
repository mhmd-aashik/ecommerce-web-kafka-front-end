"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { Product } from "@/types/product";

export interface CartItem {
  id: string;
  name: string;
  priceInFils: number;
  stock: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];

  addItem: (product: Product) => void;

  removeItem: (productId: string) => void;

  updateQuantity: (productId: string, quantity: number) => void;

  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: Math.min(item.quantity + 1, product.stock),
                    }
                  : item,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                id: product.id,
                name: product.name,
                priceInFils: product.priceInFils,
                stock: product.stock,
                quantity: 1,
              },
            ],
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) => {
              if (item.id !== productId) {
                return item;
              }

              return {
                ...item,
                quantity: Math.min(Math.max(quantity, 0), item.stock),
              };
            })
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "kafka-shop-cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
