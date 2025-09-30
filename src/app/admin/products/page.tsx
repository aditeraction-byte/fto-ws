import { getProducts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { ProductDataTable } from "./data-table";
import { columns } from "./columns";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl font-headline">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory here.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>
      <ProductDataTable columns={columns} data={products} />
    </div>
  );
}
