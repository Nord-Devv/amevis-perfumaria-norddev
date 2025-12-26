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

const initialCart = getLocalStorageItems();
const { total, originalTotal, hasDiscount } = calculateTotal(initialCart);

const initialState = {
  cart: initialCart,
  total,
  originalTotal,
  hasDiscount,
}

export const useCartStore = create<cartState>((set) => ({
  ...initialState,
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
  cleanCart: () => { set((state) => handleCleanCart(state)) },
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

    updateLocalStorage(updatedCart)
    return handleUpdateValues(updatedCart, state)
  } else {
    const updatedCart = [...state.cart, { ...product, quantity: 1 }];
    toast.success(`${product.name} adicionado ao carrinho!`);
    updateLocalStorage(updatedCart)

    return handleUpdateValues(updatedCart, state);
  }
};
function handleRemoveItem(index: number, state: cartState): cartState {
  const updatedCart = state.cart.filter((_, i) => i !== index);
  toast.info("Produto removido do carrinho");
  updateLocalStorage(updatedCart)

  return handleUpdateValues(updatedCart, state)
}


function handleIncreaseQuantity(index: number, state: cartState): cartState {
  const updatedCart = state.cart.map((item, i) =>
    i === index ? { ...item, quantity: item.quantity + 1 } : item)
  updateLocalStorage(updatedCart)

  return handleUpdateValues(updatedCart, state)
}

function handleDecreaseQuantity(index: number, state: cartState): cartState {
  const updatedCart = state.cart.map((item, i) =>
    i === index ? { ...item, quantity: item.quantity - 1 } : item)
    .filter(item => item.quantity > 0);
  updateLocalStorage(updatedCart)

  return handleUpdateValues(updatedCart, state)
}

// update cart values -> total, originalTotal and hasDiscount
function handleUpdateValues(cart: CartItem[], state: cartState): cartState {
  const { total, originalTotal, hasDiscount } = calculateTotal(cart);
  return { ...state, cart, total, originalTotal, hasDiscount }
}

function handleCleanCart(state: cartState): cartState {
  localStorage.clear()
  return { ...state, cart: [], total: 0, originalTotal: null, hasDiscount: false }
}


// local storage functions
function getLocalStorageItems() {
  const value = localStorage.getItem("cart")
  return value ? JSON.parse(value) as CartItem[] : []
}

function updateLocalStorage(cart: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(cart))
}
