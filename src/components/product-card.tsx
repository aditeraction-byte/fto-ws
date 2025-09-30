import Link from 'next/link';
import Image from 'next/image';
import { type Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === product.articleNo);
  const imageUrl = placeholder?.imageUrl ?? 'https://picsum.photos/seed/default/600/400';

  return (
    <Link href={`/products/${product.articleNo}`}>
      <Card className="group flex flex-col h-full overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-w-4 aspect-h-3 overflow-hidden">
            <Image
              src={imageUrl}
              alt={product.name}
              width={600}
              height={400}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
              data-ai-hint={placeholder?.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col">
          <CardTitle className="text-lg font-headline mb-2 leading-tight">{product.name}</CardTitle>
          <p className="text-muted-foreground text-sm line-clamp-2 flex-grow">{product.description}</p>
        </CardContent>
        <CardFooter className="p-4 flex items-center justify-between">
            <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
