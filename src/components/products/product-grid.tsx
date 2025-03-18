import { Product } from "@/interface";
import { ProductGridItem } from "./product-grid-item";

interface Props {
  products: Product[];
}
export const ProductGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
      {products.map((product) => (
        <ProductGridItem product={product} key={product.slug} />
      ))}
    </div>
  );
};
