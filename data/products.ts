import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "product-1",
    name: "Mechanical Keyboard",
    description: "Compact mechanical keyboard for developers.",
    priceInFils: 25_000,
    stock: 10,
  },
  {
    id: "product-2",
    name: "Wireless Mouse",
    description: "Comfortable wireless mouse.",
    priceInFils: 12_000,
    stock: 15,
  },
  {
    id: "product-3",
    name: "USB-C Hub",
    description: "USB-C hub with HDMI and USB ports.",
    priceInFils: 18_000,
    stock: 8,
  },
];
