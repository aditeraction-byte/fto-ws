"use client";

import { useState, useMemo } from 'react';
import { getProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import Header from '@/components/header';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/product-card';
import { useAuth } from '@/hooks/use-auth';
import { Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Dashboard() {
  const { protectRoute, loading: authLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  protectRoute();

  useState(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  });

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.articleNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  if (authLoading || loading) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="relative mb-8">
                        <Skeleton className="h-10 w-full max-w-lg" />
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {[...Array(8)].map((_, i) => (
                           <Skeleton key={i} className="h-[380px] w-full" />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
            <div className='text-center mb-12'>
                <h1 className="text-4xl font-headline font-bold tracking-tight lg:text-5xl">
                    Explore Our Collection
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Find the perfect product by searching by name or article number.
                </p>
            </div>

          <div className="relative mb-8 max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products by name or article no..."
              className="w-full pl-10 py-6 rounded-full shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold">No Products Found</h2>
              <p className="text-muted-foreground mt-2">
                Your search for &quot;{searchTerm}&quot; did not match any products.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
