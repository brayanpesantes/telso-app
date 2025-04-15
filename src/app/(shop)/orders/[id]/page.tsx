import { getOrderById } from "@/actions";
import { Title } from "@/components";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

type Params = Promise<{ id: string }>;

export default async function OrdersIdPage({ params }: { params: Params }) {
  const { id } = await params;
  const rest = await getOrderById(id);
  if (!rest.ok) {
    redirect("/");
  }
  const { order } = rest;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] mx-auto">
        <Title title={`Orden #${id.split("-").at(-1)}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito */}
          <div className="flex flex-col mt-5 gap-2">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": !order?.isPaid,
                  "bg-green-700": order?.isPaid,
                }
              )}
            >
              <IoCardOutline size={30} />
              {order?.isPaid ? (
                <span className="mx-2">Pagada</span>
              ) : (
                <span className="mx-2">Pendiente de Pago</span>
              )}
            </div>
            {/* Items */}
            {order?.products?.map((product, index) => (
              <div className="flex" key={`${product.title}-${index}`}>
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
                  <p className="font-medium">
                    {currencyFormat(product.price)} x {product.quantity}
                  </p>
                  <p className="font-bold">Subtotal: ${product.subtotal}</p>
                </div>
              </div>
            ))}
          </div>
          {/* checkout - Resumen de la orden  */}
          <div className="bg-white rounded-xl shadow-xl p-7 ">
            <h2 className="text-2xl mb-2">Dirección de la entrega</h2>
            <div className="mb-10">
              <p className="text-xl">
                {order?.addres?.firstName} {order?.addres?.lastName}
              </p>
              <p>{order?.addres?.address}</p>
              <p>{order?.addres?.address2}</p>
              <p>{order?.addres?.city}</p>
              <p>{order?.addres?.country}</p>
              <p>{order?.addres?.postalCode}</p>
              <p>{order?.addres?.phone}</p>
            </div>
            {/* Divider */}
            <div className="w-full h-0.5 rounded-xs bg-gray-200 mb-10" />
            <h2 className="text-2xl mb-2">Resumen de la orden</h2>
            <div className="grid grid-cols-2">
              <span className="">No. Productos</span>
              <span className="text-right">
                {order?.quantity}{" "}
                {order!.quantity > 1 ? "articulos" : "articulo"}
              </span>

              <span className="">Subtotal</span>
              <span className="text-right">
                {currencyFormat(order!.subTotal)}
              </span>

              <span className="">Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>
              <span className="mt-5 text-2xl">Total:</span>
              <span className="text-right mt-5">
                {currencyFormat(order!.total)}
              </span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": !order?.isPaid,
                    "bg-green-700": order?.isPaid,
                  }
                )}
              >
                <IoCardOutline size={30} />
                {order?.isPaid ? (
                  <span className="mx-2">Pagada</span>
                ) : (
                  <span className="mx-2">Pendiente de Pago</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
