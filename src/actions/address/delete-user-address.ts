"use server";

import { prisma } from "@/lib/prisma";

export const DeleteUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.delete({
      where: {
        userId: userId,
      },
    });
    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo eliminar la direccion",
    };
  }
};
