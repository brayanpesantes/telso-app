"use client";

import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const addres = useAddressStore((state) => state.address);
  const itemsInCart = useCartStore(
    (state) => state.getSummaryInformation().itemsInCart
  );
  const subTotal = useCartStore(
    (state) => state.getSummaryInformation().subTotal
  );
  const tax = useCartStore((state) => state.getSummaryInformation().tax);
  const total = useCartStore((state) => state.getSummaryInformation().total);

  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    const productsToOrder = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      size: item.size,
    }));
  };

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 ">
      <h2 className="text-2xl mb-2">Dirección de la entrega</h2>
      <div className="mb-10">
        <p className="text-xl">
          {addres.firstName} {addres.lastName}
        </p>
        <p>{addres.address}</p>
        <p>{addres.address2}</p>
        <p>{addres.postalCode}</p>
        <p>
          CP {addres.city}, {addres.country}
        </p>
        <p>{addres.phone}</p>
      </div>
      {/* Divider */}
      <div className="w-full h-0.5 rounded-xs bg-gray-200 mb-10" />
      <h2 className="text-2xl mb-2">Resumen de la orden</h2>
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
      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros{" "}
            <a href="#" className="underline">
              términos y condiciones
            </a>{" "}
            y{" "}
            <a href="#" className="underline">
              políticas de privacidad
            </a>
          </span>
        </p>
        {/* <p className="text-red-500">Error de Creación</p> */}
        <button
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
          onClick={() => onPlaceOrder}
        >
          Colocar Orden
        </button>
      </div>
    </div>
  );
};
