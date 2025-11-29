"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

function ProductGrid() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "/api/products";
        if (categoryParam) {
          url += `?category=${categoryParam}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryParam]);

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    if (!debouncedSearch) return products;

    const query = debouncedSearch.toLowerCase();
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  }, [products, debouncedSearch]);

  const getCategoryTitle = () => {
    if (!categoryParam) return "All Products";
    return categoryParam
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {getCategoryTitle()}
          </h1>

          {/* Search Input */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">Loading products...</p>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-lg text-muted-foreground">
              No products found matching your search.
            </p>
          </motion.div>
        )}

        {/* Products Grid */}
        {!loading && filteredProducts.length > 0 && (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground mb-6"
            >
              Showing {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""}
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductGrid />
    </Suspense>
  );
}