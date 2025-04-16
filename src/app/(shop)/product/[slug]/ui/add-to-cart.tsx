"use client";
import { QuantitySelector, SizeSelector } from "@/components";
import type { CartProduct, Product, ValidSizes } from "@/interface";
import { useCartStore } from "@/store";
import { useState } from "react";
interface Props {
  product: Product;
}
export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductCart);

  const [size, setSize] = useState<ValidSizes | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size!,
      image: product.images[0],
    };
    if (!size) return;

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };
  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-500 ">Debe seleccionar una talla*</span>
      )}
      {/* selector de tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onChanged={(size) => setSize(size)}
      />
      {/* selector de cantidad */}
      <QuantitySelector
        quantity={quantity}
        setChanged={(quantity) => setQuantity(quantity)}
      />
      {/* button */}
      <button className="btn-primary my-5" onClick={addToCart}>
        Agregar al carrito
      </button>
    </>
  );
};
