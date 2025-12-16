'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/lib/cart';

import { Product } from '@/lib/products';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        });
    };

    return (
        <Card id={`product-${product.id}`} className="group overflow-hidden border-none shadow-none hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-lg bg-muted/20">
                {product.isNew && (
                    <Badge className="absolute left-2 top-2 z-10 bg-indigo-500 hover:bg-indigo-600">
                        New Arrival
                    </Badge>
                )}
                {product.discount && (
                    <Badge variant="destructive" className="absolute right-2 top-2 z-10">
                        -{product.discount}%
                    </Badge>
                )}
                <div className="absolute right-2 top-12 z-10 translate-x-12 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-md">
                        <Heart className="h-4 w-4" />
                    </Button>
                </div>
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0 bg-gradient-to-t from-black/60 to-transparent">
                    <Button
                        className="w-full gap-2 bg-white text-black hover:bg-white/90"
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                    </Button>
                </div>
            </div>
            <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                    <div className="flex items-center gap-1 text-amber-400">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-xs font-medium text-foreground">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                </div>
                <Link href={`/product/${product.id}`} className="group-hover:underline">
                    <h3 className="line-clamp-1 font-medium">{product.name}</h3>
                </Link>
                <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-bold" suppressHydrationWarning>₹{product.price.toLocaleString('en-IN')}</span>
                    {product.discount && (
                        <span className="text-sm text-muted-foreground line-through" suppressHydrationWarning>
                            ₹{Math.round(product.price * (1 + product.discount / 100)).toLocaleString('en-IN')}
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
