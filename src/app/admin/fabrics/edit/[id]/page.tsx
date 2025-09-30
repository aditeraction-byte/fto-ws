import { getProductById } from "@/lib/data";
import { FabricForm } from "@/components/fabric-form";
import { notFound } from "next/navigation";

export default async function EditFabricPage({ params }: { params: { id: string } }) {
  const fabric = await getProductById(params.id);

  if (!fabric) {
    notFound();
  }

  return (
    <div>
      <FabricForm fabric={fabric} />
    </div>
  );
}
