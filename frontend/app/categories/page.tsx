'use client';

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
    {
        id: 'electronics',
        name: 'Electronics',
        image: '/images/electronics.png',
        description: 'Latest gadgets and tech',
        count: '120+ Items'
    },
    {
        id: 'fashion',
        name: 'Fashion',
        image: '/images/fashion.png',
        description: 'Trendy clothing and accessories',
        count: '350+ Items'
    },
    {
        id: 'beauty',
        name: 'Beauty',
        image: '/images/beauty.png',
        description: 'Skincare and makeup',
        count: '200+ Items'
    },
    {
        id: 'home',
        name: 'Home & Living',
        image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=800',
        description: 'Decor for your space',
        count: '80+ Items'
    },
    {
        id: 'sports',
        name: 'Sports',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800',
        description: 'Gear for your active life',
        count: '60+ Items'
    },
    {
        id: 'books',
        name: 'Books',
        image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=800',
        description: 'Stories and knowledge',
        count: '500+ Items'
    }
];

export default function CategoriesPage() {
    return (
        <div className="container py-8 max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-8">
                <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                    Shop by Category
                </h1>
                <p className="text-muted-foreground text-sm">
                    Explore our carefully curated collections.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {CATEGORIES.map((category) => (
                    <Link href={`/products?category=${category.id}`} key={category.id}>
                        <Card className="group overflow-hidden h-[250px] relative border-none cursor-pointer rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                            <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                            <CardContent className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                                <div className="transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                                    <p className="text-xs font-medium text-indigo-300 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {category.count}
                                    </p>
                                    <h2 className="text-xl font-bold mb-1">{category.name}</h2>
                                    <p className="text-xs text-gray-300 line-clamp-1 opacity-90">
                                        {category.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
