"use server";
import { auth } from "@/auth.config";
import type { Address, ValidSizes } from "@/interface";
import { prisma } from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: ValidSizes;
}

export const placeOrder = async (
  productId: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) return { ok: false, message: "No session de usuario" };

  //   obtener la informacion del producto
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productId.map((product) => product.productId),
      },
    },
  });
  //   calcular los montos /Encabezados

  const itemsInOrder = productId.reduce((count, p) => count + p.quantity, 0);

  //   calcular  al tax , subtotal y total
  const { subTotal, tax, total } = productId.reduce(
    (totals, items) => {
      const productQuantity = items.quantity;
      const product = products.find((p) => p.id === items.productId);
      if (!product) throw new Error(`${items.productId} no existe`);

      const subTotal = product.price * productQuantity;
      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;
      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  try {
    //   crear la transaccion a la base de datos
    const prismaTx = await prisma.$transaction(async (tx) => {
      //1. actulizar el stock
      const updateProductsPromise = products.map(async (product) => {
        //acomular los valores
        const productQuantity = productId
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);
        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene stock`);
        }
        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });
      const updateProducts = await Promise.all(updateProductsPromise);
      // verifica productos negativos  en la exitencia  = no hay stock

      updateProducts.forEach((product) => {
        if (product.inStock <= 0) {
          throw new Error(`${product.title} no tiene stock sufiente`);
        }
      });
      //2. crear el order - Encabezado - Detalle
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,
          OrderItem: {
            createMany: {
              data: productId.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });
      //validar , si la el price es cero , entoces  lazar un error

      //3. crear la direccion de la orden
      //address
      const { country, ...restAddress } = address;

      const orderAddress = await tx.orderAddress.create({
        data: {
          firstName: restAddress.firstName,
          lastName: restAddress.lastName,
          address: restAddress.address,
          address2: restAddress.address2,
          city: restAddress.city,
          postalCode: restAddress.postalCode,
          phone: restAddress.phone,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        order: order,
        updateProducts: updateProducts,
        orderAddress,
      };
    });
    return {
      ok: true,
      message: "Orden creada",
      order: prismaTx.order.id,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
