"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (productsInCart.length === 0 && loaded === true) {
      router.replace("/empty");
    }
  }, [productsInCart, loaded]);
  if (!loaded) {
    return <div>cargando...</div>;
  }
  return (
    <>
      {loaded &&
        productsInCart.map((product) => (
          <div className="flex" key={`${product.slug}-${product.size}`}>
            <Image
              src={`/products/${product.image}`}
              style={{ width: "100px", height: "100px" }}
              width={100}
              height={100}
              alt={product.title}
              className="mr-5 rounded-s-xs"
            />
            <div className="flex-1">
              <span>
                {product.size} - {product.title} ({product.quantity})
              </span>
              <p className="font-bold">
                {currencyFormat(product.price * product.quantity)}
              </p>
            </div>
          </div>
        ))}
    </>
  );
};
