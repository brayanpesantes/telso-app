"use server";

import { prisma } from "@/lib/prisma";
import { Gender, Product, Size } from "@prisma/client";
import { z } from "zod";

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);
  console.log(productParsed.error?.errors);

  if (!productParsed.success) {
    return { ok: false };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();
  const { id, ...restProduct } = product;

  const tagArray = restProduct.tags
    .split(",")
    .map((tag) => tag.trim().toLowerCase());

  const prismaTx = await prisma.$transaction(async (tx) => {
    let product: Product;
    if (id) {
      product = await prisma.product.update({
        where: { id },
        data: {
          ...restProduct,
          sizes: { set: restProduct.sizes as Size[] },
          tags: {
            set: tagArray,
          },
        },
      });
    } else {
      product = await prisma.product.create({
        data: {
          ...restProduct,
          sizes: { set: restProduct.sizes as Size[] },
          tags: { set: tagArray },
        },
      });
    }
    return {
      product,
    };
  });
  return { ok: true };
};
