import { Title } from "@/components";
import Link from "next/link";
import { PlaceOrder } from "./ui/place-order";
import { ProductsInCart } from "./ui/products-in-cart";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] mx-auto">
        <Title title="Verificar orden" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link href="/cart" className="underline mb-5">
              Editar Carrito
            </Link>
            {/* Items */}
            <ProductsInCart />
          </div>
          {/* checkout - Resumen de la orden  */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
