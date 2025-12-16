'use client';

import { Button } from "@/components/ui/button";
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <div className="container flex flex-col items-center justify-center min-h-[60vh] py-10 text-center">
                <div className="bg-muted/30 p-6 rounded-full mb-6">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-8 max-w-md">
                    Looks like you haven't added anything to your cart yet.
                    Start shopping to find amazing deals!
                </p>
                <Link href="/products">
                    <Button size="lg">
                        Start Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-10 max-w-6xl">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart ({items.length} items)</h1>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 rounded-xl border bg-card/50 backdrop-blur-sm">
                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border bg-muted/20">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex flex-1 flex-col justify-between">
                                <div className="flex justify-between gap-2">
                                    <div>
                                        <h3 className="font-semibold line-clamp-1">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">₹{item.price.toLocaleString()}</p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex items-center rounded-md border bg-background">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-none"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-none"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <div className="ml-auto font-bold">
                                        ₹{(item.price * item.quantity).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <Button variant="outline" className="mt-4" onClick={clearCart}>
                        Clear Cart
                    </Button>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="rounded-xl border bg-card/50 backdrop-blur-sm p-6 space-y-4 sticky top-24">
                        <h2 className="text-xl font-semibold">Order Summary</h2>
                        <Separator />

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span className="text-green-500">Free</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Tax (18%)</span>
                                <span>₹{Math.round(total * 0.18).toLocaleString()}</span>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>₹{Math.round(total * 1.18).toLocaleString()}</span>
                        </div>

                        <Button className="w-full gap-2" size="lg">
                            Checkout <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
