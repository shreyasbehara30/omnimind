'use client';

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import { PRODUCTS } from "@/lib/products";

// Select specific products to feature (Sony Headphones, Nike Shoes, iPhone 15)
const FEATURED_PRODUCTS = PRODUCTS.filter(p => ['1', '5', '3'].includes(p.id));

const CATEGORIES = [
  { name: 'Electronics', image: '/images/electronics.png', id: 'electronics' },
  { name: 'Fashion', image: '/images/fashion.png', id: 'fashion' },
  { name: 'Beauty', image: '/images/beauty.png', id: 'beauty' },
  { name: 'Home', image: '/images/home.png', id: 'home' }
];

export default function Home() {
  const openChat = () => {
    window.dispatchEvent(new Event('open-chat'));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Concise & Impactful */}
      <section className="relative h-[500px] w-full overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="container relative z-10 flex h-full flex-col justify-center items-center text-center">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-md">
              <Sparkles className="mr-2 h-4 w-4 text-yellow-400" />
              <span>AI-Powered Shopping Experience</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Your Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI Stylist</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Discover products curated just for you. OmniMind understands your style and finds the best deals.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-white text-black hover:bg-white/90 px-8">
                  Shop Now
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm px-8"
                onClick={openChat}
              >
                Meet OmniMind
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories - Quick Access */}
      <section className="container py-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link href={`/products?category=${cat.id}`} key={cat.id}>
              <Card className="group overflow-hidden border-none shadow-md hover:shadow-lg transition-all cursor-pointer">
                <div className="relative h-32 w-full">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white font-bold text-lg">{cat.name}</h3>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="container pb-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Trending Now</h2>
            <p className="text-muted-foreground">Top picks loved by shoppers.</p>
          </div>
          <Link href="/products" className="flex items-center text-primary hover:underline text-sm font-medium">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* AI Personalization Banner */}
      <section className="container pb-16">
        <div className="rounded-2xl bg-gradient-to-r from-indigo-900 via-purple-900 to-background border border-white/10 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <div className="flex items-center gap-2 text-indigo-300">
                <TrendingUp className="h-5 w-5" />
                <span className="font-semibold">Personalized for you</span>
              </div>
              <h2 className="text-2xl font-bold text-white">
                "Based on your interest in <span className="text-indigo-400">Minimalist Design</span>..."
              </h2>
              <p className="text-indigo-100/80 text-sm">
                OmniMind has curated a collection of sleek, functional items that match your aesthetic.
              </p>
              <Link href="/products">
                <Button variant="secondary" className="mt-4">
                  View Collection
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
