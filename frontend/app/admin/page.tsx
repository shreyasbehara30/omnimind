'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, ShoppingBag, MessageSquare, TrendingUp, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="container py-10">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <div className="flex gap-2">
                    <Button variant="outline">Export Report</Button>
                    <Button>Settings</Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <span className="text-muted-foreground font-bold">₹</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹4,231,890</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2350</div>
                        <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">AI Conversations</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12,234</div>
                        <p className="text-xs text-muted-foreground">+19% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Automation Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85.4%</div>
                        <p className="text-xs text-muted-foreground">+4% from last month</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Main Chart Area */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[350px] flex items-center justify-center bg-muted/20 rounded-md">
                            <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                            <span className="ml-2 text-muted-foreground">Chart Visualization Placeholder</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity / AI Insights */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>AI Insights & Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-red-100 p-2 rounded-full">
                                    <AlertCircle className="h-4 w-4 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">High Frustration Detected</p>
                                    <p className="text-xs text-muted-foreground">User ID #8821 showed signs of anger in Support Chat. Escalated to human agent.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-green-100 p-2 rounded-full">
                                    <TrendingUp className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Sales Agent Success</p>
                                    <p className="text-xs text-muted-foreground">SalesAgent successfully upsold "Protection Plan" to 15% of users today.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-blue-100 p-2 rounded-full">
                                    <MessageSquare className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">New Intent Discovered</p>
                                    <p className="text-xs text-muted-foreground">Users are asking about "Gift Wrapping" frequently. Suggest adding this feature.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
