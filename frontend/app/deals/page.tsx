'use client';

import { ProductCard } from "@/components/product/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Timer } from "lucide-react";

// Mock Deals Data
const DEALS = [
    {
        id: '2',
        name: 'Nike Air Jordan 1 High',
        price: 16995,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
        category: 'Fashion',
        rating: 4.9,
        reviews: 856,
        discount: 10
    },
    {
        id: '5',
        name: 'Samsung Odyssey G9',
        price: 129999,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
        category: 'Electronics',
        rating: 4.8,
        reviews: 420,
        discount: 15
    },
    {
        id: '6',
        name: 'Logitech MX Master 3S',
        price: 9995,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800',
        category: 'Electronics',
        rating: 4.9,
        reviews: 1500,
        discount: 20
    },
    {
        id: '7',
        name: 'Ray-Ban Aviator Classic',
        price: 8500,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800',
        category: 'Fashion',
        rating: 4.7,
        reviews: 320,
        discount: 25
    },
    {
        id: '12',
        name: 'Nespresso Vertuo',
        price: 19500,
        image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&q=80&w=800',
        category: 'Home',
        rating: 4.8,
        reviews: 670,
        discount: 5
    }
];

export default function DealsPage() {
    return (
        <div className="container py-8 max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <h1 className="text-3xl font-bold">Flash Deals</h1>
                <Badge variant="destructive" className="text-sm px-3 py-1 flex items-center gap-1">
                    <Timer className="h-3 w-3" />
                    Ending Soon
                </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {DEALS.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
