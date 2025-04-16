"use client";

import { ProductImage, QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeProduct = useCartStore((state) => state.removeProduct);

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
            <ProductImage
              src={product.image}
              style={{ width: "100px", height: "100px" }}
              width={100}
              height={100}
              alt={product.title}
              className="mr-5 rounded-s-xs"
            />
            <div className="flex-1">
              <Link
                href={`product/${product.slug}`}
                className="hover:underline hover:cursor-pointer"
              >
                <p className="font-semibold">
                  {product.size} - {product.title}
                </p>
              </Link>
              <p className="font-medium">${product.price}</p>
              <QuantitySelector
                quantity={product.quantity}
                setChanged={(quantity) =>
                  updateProductQuantity(product, quantity)
                }
              />
              <button
                className="underline mt-3 cursor-pointer"
                onClick={() => removeProduct(product)}
              >
                Remover
              </button>
            </div>
          </div>
        ))}
    </>
  );
};
