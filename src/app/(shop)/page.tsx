export const revalidate = 60; // 60 segundos
import { getPaginationProductWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;

  const { products, totalPages } = await getPaginationProductWithImages({
    page,
  });

  return (
    <>
      <Title title="Tienda" subTitle="Todos los Productos" className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
