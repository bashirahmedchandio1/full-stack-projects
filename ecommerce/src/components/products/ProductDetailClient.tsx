"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

interface ProductDetailClientProps {
  productId: string;
}

export function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products?id=${productId}`);
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          setProduct(data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    setAddingToCart(true);
    addItem(product, quantity);

    setTimeout(() => {
      setAddingToCart(false);
      toast.success(
        `Added ${quantity} ${quantity === 1 ? "item" : "items"} to cart`
      );
    }, 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-muted-foreground">Product not found</p>
        <Button onClick={() => router.push("/store/products")}>
          Browse Products
        </Button>
      </div>
    );
  }

  const originalPrice = product.price;
  const discount =
    product.isOnSale && product.discountPercentage
      ? (originalPrice * product.discountPercentage) / 100
      : 0;
  const finalPrice = originalPrice - discount;

  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-6">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
              {product.isOnSale && (
                <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {product.discountPercentage}% OFF
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Category */}
            <div className="text-sm text-muted-foreground uppercase tracking-wide">
              {product.category}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold">{product.title}</h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              {product.isOnSale && product.discountPercentage ? (
                <>
                  <span className="text-3xl font-bold text-primary">
                    ${finalPrice.toFixed(2)}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                  <span className="text-sm font-semibold text-destructive">
                    Save ${discount.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="border-t pt-6">
              <label className="text-sm font-medium mb-3 block">Quantity</label>
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
              />
            </div>

            {/* Add to Cart Button */}
            <Button
              size="lg"
              className="w-full text-lg"
              onClick={handleAddToCart}
              disabled={addingToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {addingToCart ? "Adding..." : "Add to Cart"}
            </Button>

            {/* Sale End Timer */}
            {product.isOnSale && product.saleEndsAt && (
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-center">
                  <span className="font-semibold">Sale ends:</span>{" "}
                  {new Date(product.saleEndsAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
