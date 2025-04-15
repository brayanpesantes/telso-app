import { Title } from "@/components";
import Link from "next/link";
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
          <div className="bg-white rounded-xl shadow-xl p-7 ">
            <h2 className="text-2xl mb-2">Dirección de la entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Brayan Nuñez</p>
              <p>Av. Siempre activo</p>
              <p>col centro</p>
              <p>Alcaldia de Perú</p>
              <p>Ciudad de Lima</p>
              <p>CP 9847456</p>
              <p>13123.213.123.23</p>
            </div>
            {/* Divider */}
            <div className="w-full h-0.5 rounded-xs bg-gray-200 mb-10" />
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
              <Link
                className="flex btn-primary justify-center"
                href="/orders/123"
              >
                Colocar Orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
