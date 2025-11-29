"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { XCircle, ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CancelPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-background dark:from-orange-950/20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Cancel Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center"
          >
            <XCircle className="w-12 h-12 text-orange-600 dark:text-orange-400" />
          </motion.div>

          {/* Cancel Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Checkout Cancelled
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              No worries! Your cart items are still saved. You can continue
              shopping or return to checkout when you're ready.
            </p>
          </motion.div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card border rounded-lg p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold mb-1">Your cart is safe</h3>
                <p className="text-sm text-muted-foreground">
                  All items in your cart have been preserved. You can review
                  your cart and checkout whenever you're ready.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" onClick={() => router.push("/cart")}>
              <ArrowLeft className="mr-2 h-5 w-5" />
              Return to Cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/store/products")}
            >
              Continue Shopping
            </Button>
          </motion.div>

          {/* Help Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-muted-foreground mt-8"
          >
            Need help? Contact our support team at{" "}
            <a
              href="mailto:support@example.com"
              className="text-primary hover:underline"
            >
              support@example.com
            </a>
          </motion.p>
        </motion.div>
      </div>
    </main>
  );
}
