export interface Product {
  id: string;
  name: string;
  description: string;
  priceInFils: number;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export function formatAedFromFils(priceInFils: number): string {
  return (priceInFils / 100).toFixed(2);
}
