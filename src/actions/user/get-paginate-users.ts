"use server";

import { auth } from "@/auth.config";
import { prisma } from "@/lib/prisma";

export const getPaginateUsers = async () => {
  const session = await auth();
  if (session?.user.role !== "ADMIN")
    return {
      ok: false,
      message: "Debe ser un administrador ",
    };
  const users = await prisma.user.findMany({
    orderBy: {
      name: "desc",
    },
  });
  return {
    ok: true,
    users,
  };
};
