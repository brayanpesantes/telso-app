"use server";

import { prisma } from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginationProductWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;
  try {
    // 1.- obtener todos los productos
    const products = await prisma.product.findMany({
      take: 12,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      where: {
        gender: gender,
      },
    });

    // 2.- obtener todas las paginas
    const totalProducts = await prisma.product.count({
      where: { gender: gender },
    });
    const totalPages = Math.ceil(totalProducts / take);

    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    console.log(error);

    throw new Error("No se pudo obtener los datos");
  }
};
