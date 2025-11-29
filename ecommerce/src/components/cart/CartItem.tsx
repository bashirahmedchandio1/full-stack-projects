"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types/cart";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCartStore();
  const { product, quantity } = item;

  const originalPrice = product.price * quantity;
  const discount =
    product.isOnSale && product.discountPercentage
      ? (originalPrice * product.discountPercentage) / 100
      : 0;
  const finalPrice = originalPrice - discount;

  return (
    <div className="flex gap-4 py-4 border-b">
      {/* Product Image */}
      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-base">{product.title}</h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => removeItem(product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-between items-end mt-auto">
          <QuantitySelector
            quantity={quantity}
            onQuantityChange={(newQuantity) =>
              updateQuantity(product.id, newQuantity)
            }
          />

          <div className="text-right">
            {product.isOnSale && product.discountPercentage ? (
              <>
                <p className="text-sm text-muted-foreground line-through">
                  ${originalPrice.toFixed(2)}
                </p>
                <p className="text-lg font-bold text-primary">
                  ${finalPrice.toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-lg font-bold">${finalPrice.toFixed(2)}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
