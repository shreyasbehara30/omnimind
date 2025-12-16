'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, Truck, ShieldCheck, ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCart } from '@/lib/cart';
import toast from 'react-hot-toast';
import { PRODUCTS } from '@/lib/products';

export default function ProductPage() {
    const params = useParams();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const { addToCart } = useCart();

    const product = PRODUCTS.find(p => p.id === params.id);

    if (!product) {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-2xl font-bold">Product not found</h1>
                <p className="text-muted-foreground">Requested ID: {params.id}</p>
                <Link href="/products" className="mt-4 inline-block text-primary hover:underline">
                    Back to Products
                </Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        });
    };

    const images = product.images || [product.image];

    return (
        <div className="container py-10">
            <Link href="/products" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
            </Link>

            <div className="grid gap-10 lg:grid-cols-2">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted/20">
                        <Image
                            src={images[selectedImage]}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex gap-4 overflow-auto pb-2">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 ${selectedImage === idx ? 'border-primary' : 'border-transparent'
                                    }`}
                            >
                                <Image src={img} alt="Thumbnail" fill className="object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    <div>
                        <Badge className="mb-2 bg-indigo-500">Best Seller</Badge>
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <div className="mt-2 flex items-center gap-4">
                            <div className="flex items-center text-amber-400">
                                <Star className="h-4 w-4 fill-current" />
                                <span className="ml-1 font-medium text-foreground">{product.rating}</span>
                            </div>
                            <span className="text-muted-foreground">{product.reviews} reviews</span>
                        </div>
                    </div>

                    <div className="text-4xl font-bold">₹{product.price.toLocaleString()}</div>

                    <p className="text-muted-foreground leading-relaxed">
                        {product.description || "No description available."}
                    </p>

                    <Separator />

                    <div className="space-y-4">
                        <h3 className="font-semibold">Specifications</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            {product.specs ? Object.entries(product.specs).map(([key, value]) => (
                                <div key={key} className="flex justify-between border-b pb-2">
                                    <span className="text-muted-foreground">{key}</span>
                                    <span className="font-medium">{value}</span>
                                </div>
                            )) : <p className="text-muted-foreground">No specifications available.</p>}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center rounded-md border">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="h-10 w-10 rounded-none"
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <div className="flex h-10 w-12 items-center justify-center border-x font-medium">
                                {quantity}
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setQuantity(quantity + 1)}
                                className="h-10 w-10 rounded-none"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart}>
                            <ShoppingCart className="h-5 w-5" />
                            Add to Cart
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4" />
                            <span>Free Delivery by Friday</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4" />
                            <span>2 Year Warranty</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
