import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/product-form";

type Params = Promise<{ slug: string }>;
interface Props {
  params: Params;
}
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [product, categories] = await Promise.all([
    await getProductBySlug(slug),
    await getCategories(),
  ]);

  if (!product && slug !== "new") {
    redirect("/admin/products");
  }
  const title = slug === "new" ? "Nuevo Product" : "Editar Product";
  return (
    <>
      <Title title={title} />
      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}
