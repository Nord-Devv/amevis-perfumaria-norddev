import type { CartItem } from '@/types/Cart';
import { create } from 'zustand'
import { toast } from "sonner";
import { calculateTotal } from '@/utils/calculateCartTotal';

interface cartState {
  cart: CartItem[];
  total: number;
  originalTotal: number | null;
  hasDiscount: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  increaseQuantity: (index: number) => void;
  decreaseQuantity: (index: number) => void;
  cleanCart: () => void;
}
export const useCartStore = create<cartState>((set) => ({
  cart: [],
  total: 0,
  originalTotal: 0,
  hasDiscount: false,
  addItem: (item) => {
    set((state) => handleAddItem(item, state))
  },
  removeItem: (index) => {
    set((state) => handleRemoveItem(index, state))
  },
  increaseQuantity: (index) => {
    set((state) => handleIncreaseQuantity(index, state))
  },
  decreaseQuantity: (index) => {
    set((state) => handleDecreaseQuantity(index, state))
  },
  cleanCart: () => { set(() => ({ cart: [] })) }
}))


function handleAddItem(product: CartItem, state: cartState): cartState {
  // Check if item already exists in cart
  const existingItemIndex = state.cart.findIndex(
    (item) =>
      item.id === product.id
  );

  if (existingItemIndex >= 0) {
    // Item exists, increase quantity
    const updatedCart = [...state.cart];
    updatedCart[existingItemIndex].quantity += 1;
    toast.success(`${product.name} - quantidade atualizada!`);

    return handleUpdateValues(updatedCart, state)
  } else {
    const updatedCart = [...state.cart, { ...product, quantity: 1 }];
    toast.success(`${product.name} adicionado ao carrinho!`);

    return handleUpdateValues(updatedCart, state);
  }
};
function handleRemoveItem(index: number, state: cartState): cartState {
  const updatedCart = state.cart.filter((_, i) => i !== index);
  toast.info("Produto removido do carrinho");

  return handleUpdateValues(updatedCart, state)
}


function handleIncreaseQuantity(index: number, state: cartState): cartState {
  const updatedCart = state.cart.map((item, i) =>
    i === index ? { ...item, quantity: item.quantity + 1 } : item)
  return handleUpdateValues(updatedCart, state)
}

function handleDecreaseQuantity(index: number, state: cartState): cartState {
  const updatedCart = state.cart.map((item, i) =>
    i === index ? { ...item, quantity: item.quantity - 1 } : item)
    .filter(item => item.quantity > 0);
  return handleUpdateValues(updatedCart, state)
}

function handleUpdateValues(cart: CartItem[], state: cartState): cartState {
  const { total, originalTotal, hasDiscount } = calculateTotal(cart);
  console.log(hasDiscount)
  return { ...state, cart, total, originalTotal, hasDiscount }
}


