export const revalidate = 604800; //7 Dias
import { getProductBySlug } from "@/actions";
import {
  ProductMobileSlideShow,
  ProductSlideShow,
  QuantitySelector,
  SizeSelector,
  StockLabel,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { slug } = await params;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product?.title ?? "producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "producto no encontrado",
      description: product?.description ?? "",
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }
  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* slideshow */}
      <div className="col-span-1 md:col-span-2">
        {/* desktop */}
        <ProductSlideShow
          images={product.images}
          title={product.title}
          className="hidden md:block"
        />
        {/* Mobile */}
        <ProductMobileSlideShow
          images={product.images}
          title={product.title}
          className="block md:hidden"
        />
      </div>
      {/* detalles */}
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>
        {/* selector de tallas */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />
        {/* selector de cantidad */}
        <QuantitySelector quantity={3} />
        {/* button */}
        <button className="btn-primary my-5">Agregar al carrito</button>
        {/* descripcion */}
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
