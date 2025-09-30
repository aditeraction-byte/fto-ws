"use client";

import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import { getProductByArticleNo } from '@/lib/data';
import type { Product } from '@/lib/types';
import Header from '@/components/header';
import { useAuth } from '@/hooks/use-auth';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Tag, Warehouse } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailPage({ params }: { params: Promise<{ articleNo: string }> }) {
  const { protectRoute, loading: authLoading } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { articleNo } = use(params);

  protectRoute();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductByArticleNo(articleNo);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [articleNo]);

  const placeholder = PlaceHolderImages.find(p => p.id === product?.articleNo);
  const imageUrl = placeholder?.imageUrl ?? 'https://picsum.photos/seed/default/800/600';

  if (authLoading || loading) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <Skeleton className="h-9 w-32 mb-8" />
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    <Skeleton className="aspect-square w-full rounded-lg" />
                    <div className="space-y-6">
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-6 w-1/4" />
                        <div className="flex gap-4">
                            <Skeleton className="h-8 w-24" />
                            <Skeleton className="h-8 w-24" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center text-center">
            <div>
                <h1 className="text-3xl font-bold font-headline">Product Not Found</h1>
                <p className="text-muted-foreground mt-2">The product you are looking for does not exist.</p>
                <Button asChild className="mt-6">
                    <Link href="/dashboard">Back to Dashboard</Link>
                </Button>
            </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to products
                </Link>
            </Button>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                <div className="aspect-square bg-card rounded-lg overflow-hidden border">
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        width={800}
                        height={800}
                        className="object-cover w-full h-full"
                        data-ai-hint={placeholder?.imageHint}
                    />
                </div>
                <div className="py-4">
                    <h1 className="text-4xl font-headline font-bold mb-2">{product.name}</h1>
                    <p className="text-3xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>

                    <div className="flex items-center space-x-6 text-sm mb-6">
                        <div className="flex items-center text-muted-foreground">
                            <Tag className="mr-2 h-5 w-5 text-primary/80"/>
                            Article No: <span className="font-semibold text-foreground ml-1">{product.articleNo}</span>
                        </div>
                         <div className="flex items-center text-muted-foreground">
                            <Warehouse className="mr-2 h-5 w-5 text-primary/80"/>
                            In Stock: <span className="font-semibold text-foreground ml-1">{product.qty}</span>
                        </div>
                    </div>

                    <h2 className="text-xl font-headline font-semibold mb-2">Description</h2>
                    <p className="text-foreground/80 leading-relaxed">{product.description}</p>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
