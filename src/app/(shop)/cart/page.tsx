import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];
export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] mx-auto">
        <Title title="Carrito" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más items</span>
            <Link href="/" className="underline mb-5">
              Continua comprando
            </Link>
            {/* Items */}
            {productsInCart.map((product) => (
              <div className="flex" key={product.slug}>
                <Image
                  src={`/products/${product.images[0]}`}
                  style={{ width: "100px", height: "100px" }}
                  width={100}
                  height={100}
                  alt={product.title}
                  className="mr-5 rounded-s-xs"
                />
                <div className="flex-1">
                  <p className="font-semibold">{product.title}</p>
                  <p className="font-medium">${product.price}</p>
                  <QuantitySelector quantity={2} />
                  <button className="underline mt-3">Remover</button>
                </div>
              </div>
            ))}
          </div>
          {/* checkout - Resumen de la orden  */}
          <div className="bg-white rounded-xl shadow-xl p-7  h-fit">
            <h2 className="text-2xl mb-2">Resumen de la orden</h2>
            <div className="grid grid-cols-2">
              <span className="">No. Productos</span>
              <span className="text-right">3 artículos</span>

              <span className="">Subtotal</span>
              <span className="text-right">$ 100</span>

              <span className="">Impuestos (15%)</span>
              <span className="text-right">$ 100</span>
              <span className="mt-5 text-2xl">Total:</span>
              <span className="text-right mt-5">$ 100</span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <Link
                className="flex btn-primary justify-center"
                href="/checkout/address"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
