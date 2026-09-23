"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type { SouvenirProduct } from "../data";

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  priceFormatted: string;
  image: string;
  category: string;
  quantity: number;
}

const CART_STORAGE_KEY = "annisa_souvenir_cart";

let memoryCart: CartItem[] = [];
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(cart: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // Ignore storage quota errors
  }
}

export const cartStore = {
  getCart(): CartItem[] {
    return memoryCart;
  },
  init() {
    if (typeof window !== "undefined") {
      memoryCart = loadCartFromStorage();
      emitChange();
    }
  },
  addItem(product: SouvenirProduct, quantity = 1) {
    const existingIndex = memoryCart.findIndex(
      (item) => item.id.toString() === product.id.toString(),
    );

    if (existingIndex > -1) {
      memoryCart = memoryCart.map((item, idx) =>
        idx === existingIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
    } else {
      memoryCart = [
        ...memoryCart,
        {
          id: product.id,
          name: product.name,
          price: product.priceNum,
          priceFormatted: product.price,
          image: product.image,
          category: product.categoryLabel,
          quantity,
        },
      ];
    }
    saveCartToStorage(memoryCart);
    emitChange();
  },
  updateQuantity(id: string | number, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(id);
      return;
    }
    memoryCart = memoryCart.map((item) =>
      item.id.toString() === id.toString() ? { ...item, quantity } : item,
    );
    saveCartToStorage(memoryCart);
    emitChange();
  },
  removeItem(id: string | number) {
    memoryCart = memoryCart.filter((item) => item.id.toString() !== id.toString());
    saveCartToStorage(memoryCart);
    emitChange();
  },
  clearCart() {
    memoryCart = [];
    saveCartToStorage(memoryCart);
    emitChange();
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

export function useCart() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    cartStore.init();
  }, []);

  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getCart,
    () => [],
  );

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return {
    items: isClient ? items : [],
    totalItemsCount: isClient ? totalItemsCount : 0,
    totalPrice: isClient ? totalPrice : 0,
    addItem: (p: SouvenirProduct, qty?: number) => cartStore.addItem(p, qty),
    updateQuantity: (id: string | number, qty: number) =>
      cartStore.updateQuantity(id, qty),
    removeItem: (id: string | number) => cartStore.removeItem(id),
    clearCart: () => cartStore.clearCart(),
  };
}
