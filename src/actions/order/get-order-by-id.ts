"use server";

import { auth } from "@/auth.config";
import { prisma } from "@/lib/prisma";

export const getOrderById = async (orderId: string) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) return { ok: false, message: "No session de usuario" };
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        OrderItem: {
          include: {
            product: {
              include: {
                ProductImage: true,
              },
            },
          },
        },
        OrderAddress: {
          include: {
            country: true,
          },
        },
      },
    });
    if (!order) return { ok: false, message: "No existe la orden" };
    if (session.user.role === "user") {
      if (order.userId !== userId)
        throw new Error("No tienes permiso para ver esta orden");
      return { ok: false, message: "No tienes permiso para ver esta orden" };
    }
    const orderMapping = {
      products: order.OrderItem.map((item) => ({
        title: item.product.title,
        price: item.product.price,
        images: item.product.ProductImage.map((image) => image.url),
        subtotal: item.price * item.quantity,
        quantity: item.quantity,
      })),
      addres: {
        ...order.OrderAddress,
        country: order.OrderAddress!.country.name,
      },
      id: order.id,
      subTotal: order.subTotal,
      tax: order.tax,
      total: order.total,
      quantity: order.itemsInOrder,
      isPaid: order.isPaid,
    };

    return { ok: true, order: orderMapping };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Error al obtener la orden" };
  }
};
