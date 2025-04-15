"use server";

import { auth } from "@/auth.config";
import { prisma } from "@/lib/prisma";

export const getOrderByUser = async () => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) return { ok: false, message: "No session de usuario" };

  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      OrderAddress: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return {
    ok: true,
    orders,
  };
};
