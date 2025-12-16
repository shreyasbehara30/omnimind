'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, CreditCard, Truck } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePlaceOrder = async () => {
        setIsProcessing(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStep(3); // Success step
        setIsProcessing(false);
    };

    if (step === 3) {
        return (
            <div className="container flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-6 rounded-full bg-green-100 p-6 text-green-600">
                    <CheckCircle2 className="h-12 w-12" />
                </div>
                <h1 className="mb-2 text-3xl font-bold">Order Confirmed!</h1>
                <p className="mb-8 text-muted-foreground">
                    Thank you for your purchase. Your order #OM-12345 has been placed.
                </p>
                <div className="flex gap-4">
                    <Link href="/account/orders">
                        <Button variant="outline">View Order</Button>
                    </Link>
                    <Link href="/">
                        <Button>Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-10">
            <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

            <div className="grid gap-10 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    {/* Shipping Address */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Truck className="h-5 w-5" />
                                Shipping Address
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Input placeholder="First Name" />
                                <Input placeholder="Last Name" />
                            </div>
                            <Input placeholder="Address Line 1" />
                            <div className="grid grid-cols-2 gap-4">
                                <Input placeholder="City" />
                                <Input placeholder="ZIP Code" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Method */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5" />
                                Payment Method
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="flex items-center gap-4 rounded-lg border p-4">
                                    <div className="h-4 w-4 rounded-full border-2 border-primary bg-primary" />
                                    <CreditCard className="h-6 w-6" />
                                    <span className="font-medium">Credit / Debit Card</span>
                                </div>
                                <Input placeholder="Card Number" />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input placeholder="MM/YY" />
                                    <Input placeholder="CVC" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Items (2)</span>
                                    <span>₹46,985</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-green-500">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>₹8,457</span>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>₹55,442</span>
                            </div>

                            <Button
                                className="w-full"
                                size="lg"
                                onClick={handlePlaceOrder}
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Processing...' : 'Place Order'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
