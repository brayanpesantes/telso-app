import { CartProduct } from "@/interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";
interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    total: number;
    tax: number;
    itemsInCart: number;
  };
  addProductCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      //   methods
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, items) => total + items.quantity, 0);
      },
      getSummaryInformation: () => {
        const { cart } = get();
        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce(
          (total, items) => total + items.quantity,
          0
        );
        return {
          subTotal,
          total,
          tax,
          itemsInCart,
        };
      },
      addProductCart: (product: CartProduct) => {
        const { cart } = get();
        const productCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );
        if (!productCart) {
          set({ cart: [...cart, product] });
          return;
        }
        const updateProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });
        set({ cart: updateProduct });
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updatedCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });
        set({ cart: updatedCart });
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updatedCart = cart.filter(
          (item) => !(item.id === product.id && item.size === product.size)
        );
        set({ cart: updatedCart });
      },
    }),
    { name: "shopping-cart" }
  )
);
