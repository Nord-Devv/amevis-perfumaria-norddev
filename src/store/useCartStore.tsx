import type { CartItem } from '@/types/Cart';
import { create } from 'zustand'

interface cartState {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  increaseQuantity: (index: number) => void;
  decreaseQuantity: (index: number) => void;
  // removeItem: (index: number) => void;
}
export const useCartStore = create<cartState>((set) => ({
  cart: [],
  addItem: (item) => {
    set((state) => handleAddToCart(item, state))
  },
  increaseQuantity: (index) => {
    set((state) => handleIncreaseQuantity(index, state))
  },
  decreaseQuantity: (index) => {
    set((state) => handleDecreaseQuantity(index, state))
  },

}))


function handleAddToCart(product: CartItem, state: cartState): cartState {
  // Check if item already exists in cart
  const existingItemIndex = state.cart.findIndex(
    (item) =>
      // item.name === product.name &&
      // item.brand === product.brand,
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

function handleIncreaseQuantity(index: number, state: cartState): cartState {
  const updatedCart = state.cart.map((item, i) =>
    i === index ? { ...item, quantity: item.quantity + 1 } : item);
  return { ...state, cart: updatedCart }
}

function handleDecreaseQuantity(index: number, state: cartState): cartState {
  const updatedCart = state.cart.map((item, i) =>
    i === index ? { ...item, quantity: item.quantity - 1 } : item);
  return { ...state, cart: updatedCart }
}


// const handleUpdateQuantity = (
//   index: number,
//   newQuantity: number,
// ) => {
//   if (newQuantity < 1) return;
//   const updatedCart = [...cartItems];
//   updatedCart[index].quantity = newQuantity;
//   setCartItems(updatedCart);
// };


