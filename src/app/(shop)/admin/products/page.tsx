import { getPaginationProductWithImages } from "@/actions";
import { Pagination, ProductImage, Title } from "@/components";
import { currencyFormat } from "@/utils";

import Link from "next/link";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ProductsPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const { products, totalPages } = await getPaginationProductWithImages({
    page,
  });

  return (
    <>
      <Title title="Mantenimientos de Productos" />
      <div className="flex justify-end mb-5">
        <Link href="/admin/product/new" className="btn-primary">
          Nuevo Producto
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Image
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Titulo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Price
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Genero
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Inventario
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Tallas
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                key={product.id}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.slug}`}>
                    <ProductImage
                      src={product?.images[0]}
                      width={80}
                      height={80}
                      alt={product.title}
                      className="size-20 object-cover rounded-sm"
                    />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/admin/product/${product.slug}`}
                    className="hover:underline"
                  >
                    {product.title}
                  </Link>
                </td>
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {currencyFormat(product.price)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  {product.gender}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  {product.inStock}
                </td>
                <td className="text-sm text-gray-900 font-bold px-6 ">
                  {product.sizes.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
