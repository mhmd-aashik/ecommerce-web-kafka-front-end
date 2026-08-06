"use client";

import { create } from "zustand";

import type { Product } from "@/types/product";
import { products } from "@/data/products";

export interface CreateProductInput {
  name: string;
  description: string;
  priceInFils: number;
  stock: number;
}

interface ProductState {
  products: Product[];
  addProduct: (input: CreateProductInput) => Product;
  removeProduct: (productId: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products,

  addProduct: (input) => {
    const product: Product = {
      id: crypto.randomUUID(),
      ...input,
    };

    set((state) => ({
      products: [...state.products, product],
    }));

    return product;
  },

  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),
}));
