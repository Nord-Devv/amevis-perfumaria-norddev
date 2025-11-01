import type { Product } from '@/types/Product'
import { create } from 'zustand'

interface selectedProductState {
  product: Product | null;
  closeProduct: () => void;
  openProduct: (product: Product) => void;
}
export const useSelectedProductStore = create<selectedProductState>((set) => ({
  product: null,
  closeProduct: () => set({ product: null }),
  openProduct: (product: Product) => set({ product }),
}))

