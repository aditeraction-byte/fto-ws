import { getProductById } from "@/lib/data";
import { ProductForm } from "@/components/product-form";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <ProductForm product={product} />
    </div>
  );
}
