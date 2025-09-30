import { getProducts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { FabricDataTable } from "./data-table";
import { columns } from "./columns";

export default async function AdminFabricsPage() {
  const fabrics = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl font-headline">Fabrics</h1>
          <p className="text-muted-foreground">
            Manage your fabric inventory here.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/fabrics/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Fabric
          </Link>
        </Button>
      </div>
      <FabricDataTable columns={columns} data={fabrics} />
    </div>
  );
}
