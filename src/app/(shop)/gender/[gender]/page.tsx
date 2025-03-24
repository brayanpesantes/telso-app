export const revalidate = 60; // 60 segundos

import { getPaginationProductWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type Params = Promise<{
  gender: Gender;
}>;

export default async function Page(props: {
  searchParams: SearchParams;
  params: Params;
}) {
  const { gender } = await props.params;
  if (!Object.values(Gender).includes(gender as Gender)) {
    notFound();
  }

  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;

  const { products, totalPages } = await getPaginationProductWithImages({
    page,
    gender,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }
  return (
    <>
      <Title
        title={`Productos de ${gender}`}
        subTitle={`Todos los Productos`}
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
