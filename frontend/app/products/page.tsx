'use client';

import { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

import { PRODUCTS } from "@/lib/products";

const CATEGORIES = ['Electronics', 'Fashion', 'Home', 'Sports', 'Beauty'];

function ProductsContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');

    // Initialize categories from URL
    const initialCategories = useMemo(() => {
        if (!categoryParam) return [];
        // Capitalize first letter to match data (e.g. 'electronics' -> 'Electronics')
        return [categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)];
    }, [categoryParam]);

    // Sync categories with URL when it changes
    useEffect(() => {
        if (categoryParam) {
            setSelectedCategories([categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)]);
        } else {
            setSelectedCategories([]);
        }
    }, [categoryParam]);

    const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
    const [priceRange, setPriceRange] = useState([0, 200000]);
    const [sliderValue, setSliderValue] = useState([0, 200000]);
    const [minRating, setMinRating] = useState(0);

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const searchQuery = searchParams.get('search')?.toLowerCase();

    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter(product => {
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
            const matchesRating = product.rating >= minRating;

            // Search Logic
            const matchesSearch = !searchQuery ||
                product.name.toLowerCase().includes(searchQuery) ||
                product.category.toLowerCase().includes(searchQuery) ||
                product.description?.toLowerCase().includes(searchQuery) ||
                (product.specs && Object.values(product.specs).some(val => val.toLowerCase().includes(searchQuery)));

            return matchesCategory && matchesPrice && matchesRating && matchesSearch;
        });
    }, [selectedCategories, priceRange, minRating, searchQuery]);

    const clearFilters = () => {
        setSelectedCategories([]);
        setPriceRange([0, 200000]);
        setSliderValue([0, 200000]);
        setMinRating(0);
        // Optional: Clear URL params if needed, but for now just clear local state
    };

    // Dynamic Title
    const pageTitle = useMemo(() => {
        if (searchQuery) return `Results for "${searchQuery}"`;
        if (selectedCategories.length === 1) return selectedCategories[0];
        if (selectedCategories.length > 1) return "Filtered Products";
        return "All Products";
    }, [searchQuery, selectedCategories]);

    const FilterContent = () => (
        <div className="space-y-8">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                        <Filter className="h-4 w-4" /> Filters
                    </h3>
                    {(selectedCategories.length > 0 || minRating > 0 || priceRange[0] > 0 || priceRange[1] < 200000) && (
                        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground">
                            Clear all
                        </Button>
                    )}
                </div>
                <Separator className="mb-4" />

                <div className="space-y-4">
                    <h4 className="text-sm font-medium">Categories</h4>
                    <div className="space-y-2">
                        {CATEGORIES.map((cat) => (
                            <div key={cat} className="flex items-center space-x-2">
                                <Checkbox
                                    id={cat}
                                    checked={selectedCategories.includes(cat)}
                                    onCheckedChange={() => toggleCategory(cat)}
                                />
                                <label htmlFor={cat} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                                    {cat}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium">Price Range</h4>
                    <span className="text-xs text-muted-foreground" suppressHydrationWarning>
                        ₹{sliderValue[0].toLocaleString('en-IN')} - ₹{sliderValue[1].toLocaleString('en-IN')}
                    </span>
                </div>
                <Slider
                    defaultValue={[0, 200000]}
                    max={200000}
                    step={1000}
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    onValueCommit={setPriceRange}
                    className="mb-2"
                />
            </div>

            <div>
                <h4 className="text-sm font-medium mb-4">Minimum Rating</h4>
                <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                            <Checkbox
                                id={`rating-${rating}`}
                                checked={minRating === rating}
                                onCheckedChange={() => setMinRating(minRating === rating ? 0 : rating)}
                            />
                            <label htmlFor={`rating-${rating}`} className="text-sm leading-none cursor-pointer">
                                {rating} Stars & Up
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="container py-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Desktop Sidebar */}
                <aside className="w-full md:w-64 shrink-0 hidden md:block sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pr-4">
                    <FilterContent />
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold capitalize">{pageTitle}</h1>
                            <p className="text-sm text-muted-foreground mt-1">
                                Showing {filteredProducts.length} results
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="sm" className="md:hidden">
                                        <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                                    <SheetHeader>
                                        <SheetTitle>Filters</SheetTitle>
                                    </SheetHeader>
                                    <div className="mt-8">
                                        <FilterContent />
                                    </div>
                                </SheetContent>
                            </Sheet>

                            <Button variant="outline" size="sm" className="hidden md:flex">
                                Sort by: Featured
                            </Button>
                        </div>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-lg text-muted-foreground">No products found matching your filters.</p>
                            <Button variant="link" onClick={clearFilters} className="mt-2">
                                Clear all filters
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductsContent />
        </Suspense>
    );
}
