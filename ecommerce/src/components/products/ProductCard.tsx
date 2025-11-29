"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CountdownTimer } from "./CountdownTimer";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/store/products/${product.id}`}>
        <Card className="group overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300 cursor-pointer">
          <div className="relative aspect-[3/4] overflow-hidden bg-muted">
            <Image
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {product.isOnSale && product.discountPercentage && (
              <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white">
                -{product.discountPercentage}%
              </Badge>
            )}
          </div>

          <CardContent className="flex-1 p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
              {product.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center gap-2 mb-2">
              {product.isOnSale && product.discountPercentage ? (
                <>
                  <span className="text-lg font-bold text-red-500">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {product.isOnSale && product.saleEndsAt && (
              <CountdownTimer endDate={product.saleEndsAt} className="mb-2" />
            )}
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button className="w-full" size="sm">
              <ShoppingCart className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};
