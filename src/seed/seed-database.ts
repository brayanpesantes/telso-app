import { prisma } from "./../lib/prisma";
import { initialData } from "./seed";

async function main() {
  // 1. Borrado previo de datos
  // await Promise.all([
  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  // ]);

  const { categories, products, users } = initialData;
  //users
  await prisma.user.createMany({ data: users });
  //Categorías
  const categoriesData = categories.map((category) => ({ name: category }));
  await prisma.category.createMany({ data: categoriesData });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  // Productos
  // Fix: Using Promise.all to properly wait for all async operations
  await Promise.all(
    products.map(async (product) => {
      const { type, images, ...productData } = product;
      
      const productDB = await prisma.product.create({
        data: {
          ...productData,
          categoryId: categoriesMap[type], // Map the type to the correct categoryId
        },
      });

      //images
      const imagesData = images.map((image) => ({
        url: image,
        productId: productDB.id,
      }));
      await prisma.productImage.createMany({ data: imagesData });
    })
  );

  console.log("seed ejecutado correctamente...");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
