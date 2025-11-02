import type { CartItem } from '@/types/Cart';
import { create } from 'zustand'

interface cartState {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  increaseQuantity: (index: number) => void;
  decreaseQuantity: (index: number) => void;
}
export const useCartStore = create<cartState>((set) => ({
  cart: [],
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
    return { ...state, cart: updatedCart }
    // toast.success(`${product.name} - quantidade atualizada!`);
  } else {
    return { ...state, cart: [...state.cart, { ...product, quantity: 1 }] };
    // toast.success(`${product.name} adicionado ao carrinho!`);
  }
};
function handleRemoveItem(index: number, state: cartState): cartState {
  const updatedCart = state.cart.filter((_, i) => i !== index);
  return { ...state, cart: updatedCart };
  // toast.info("Produto removido do carrinho");

}


function handleIncreaseQuantity(index: number, state: cartState): cartState {
  const updatedCart = state.cart.map((item, i) =>
    i === index ? { ...item, quantity: item.quantity + 1 } : item)
  return { ...state, cart: updatedCart }
}

function handleDecreaseQuantity(index: number, state: cartState): cartState {
  const updatedCart = state.cart.map((item, i) =>
    i === index ? { ...item, quantity: item.quantity - 1 } : item)
    .filter(item => item.quantity > 0);
  return { ...state, cart: updatedCart }
}


