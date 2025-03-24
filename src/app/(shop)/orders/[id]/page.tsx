import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

type Params = Promise<{ id: string }>;

export default async function OrdersIdPage({ params }: { params: Params }) {
  const { id } = await params;
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] mx-auto">
        <Title title={`Orden #${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": false,
                  "bg-green-700": true,
                }
              )}
            >
              <IoCardOutline size={30} />
              {/* <span className="mx-2">Pendiente de Pago</span> */}
              <span className="mx-2">Pagada</span>
            </div>
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
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                  <button className="underline mt-3">Remover</button>
                </div>
              </div>
            ))}
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
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": false,
                    "bg-green-700": true,
                  }
                )}
              >
                <IoCardOutline size={30} />
                {/* <span className="mx-2">Pendiente de Pago</span> */}
                <span className="mx-2">Pagada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
