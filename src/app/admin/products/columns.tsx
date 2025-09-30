"use client";

import { type ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

import { type Product } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { deleteProductAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

const CellActions = ({ product }: { product: Product }) => {
    const { toast } = useToast();
    const router = useRouter();

    const handleDelete = async () => {
        if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
            const result = await deleteProductAction(product.id);
            if (result.success) {
                toast({ title: "Product Deleted", description: `"${product.name}" has been removed.` });
                router.refresh();
            } else {
                toast({ variant: "destructive", title: "Error", description: result.error });
            }
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                    <Link href={`/admin/products/edit/${product.id}`}>Edit</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/products/${product.articleNo}`} target="_blank">View</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
        const product = row.original;
        const placeholder = PlaceHolderImages.find(p => p.id === product.articleNo);
        const imageUrl = placeholder?.imageUrl ?? 'https://picsum.photos/seed/default/40/40';
        return (
            <div className="flex items-center gap-3">
                <Image 
                    src={imageUrl} 
                    alt={product.name} 
                    width={40} 
                    height={40} 
                    className="rounded-md object-cover"
                    data-ai-hint={placeholder?.imageHint}
                />
                <div className="flex flex-col">
                    <span className="font-medium">{product.name}</span>
                    <span className="text-muted-foreground text-xs">{product.articleNo}</span>
                </div>
            </div>
        )
    },
  },
  {
    accessorKey: "qty",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="justify-center w-full"
          >
            Stock
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
        const qty = row.getValue("qty") as number;
        let variant: "default" | "secondary" | "destructive" = "secondary";
        if (qty > 20) variant = "default";
        if (qty < 10) variant = "destructive";

        return (
            <div className="text-center">
                <Badge variant={variant} className={cn(
                    variant === 'default' && 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
                    variant === 'destructive' && 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
                )}>
                    {qty} in stock
                </Badge>
            </div>
        )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
        return (
          <div className="text-right">
             <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="justify-end w-full"
            >
                Price
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions product={row.original} />,
  },
];
