"use client";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const itemsInCart = useCartStore(
    (state) => state.getSummaryInformation().itemsInCart
  );
  const subTotal = useCartStore(
    (state) => state.getSummaryInformation().subTotal
  );
  const tax = useCartStore((state) => state.getSummaryInformation().tax);
  const total = useCartStore((state) => state.getSummaryInformation().total);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <div>loading...</div>;
  }

  return (
    <div className="grid grid-cols-2">
      <span className="">No. Productos</span>
      <span className="text-right">
        {itemsInCart === 1 ? "1 articulo" : `${itemsInCart} artículos`}
      </span>

      <span className="">Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span className="">Impuestos (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>
      <span className="mt-5 text-2xl">Total:</span>
      <span className="text-right mt-5"> {currencyFormat(total)}</span>
    </div>
  );
};
