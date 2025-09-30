"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleUser, LogOut, Menu, Package, Home, Layers } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { Logo } from "./icons";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const isAdmin = user.role === 'admin';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href={isAdmin ? '/admin/dashboard' : '/dashboard'}
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Logo className="h-6 w-6 text-primary" />
          <span className="sr-only">ProductVerse</span>
        </Link>
        <Link
          href={isAdmin ? '/admin/dashboard' : '/dashboard'}
          className="text-foreground/70 transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
        {isAdmin && (
             <Link
                href="/admin/products"
                className="text-foreground/70 transition-colors hover:text-foreground"
            >
                Products
            </Link>
        )}
        {isAdmin && (
             <Link
                href="/admin/fabrics"
                className="text-foreground/70 transition-colors hover:text-foreground"
            >
                Fabrics
            </Link>
        )}
      </nav>
      
      {isAdmin && (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Logo className="h-6 w-6 text-primary" />
                <span className="font-headline">ProductVerse</span>
              </Link>
              <Link href="/admin/dashboard" className="text-muted-foreground hover:text-foreground">
                <Home className="mr-2 h-5 w-5 inline-block" />
                Dashboard
              </Link>
              <Link href="/admin/products" className="text-muted-foreground hover:text-foreground">
                <Package className="mr-2 h-5 w-5 inline-block" />
                Products
              </Link>
              <Link href="/admin/fabrics" className="text-muted-foreground hover:text-foreground">
                <Layers className="mr-2 h-5 w-5 inline-block" />
                Fabrics
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      )}

      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}