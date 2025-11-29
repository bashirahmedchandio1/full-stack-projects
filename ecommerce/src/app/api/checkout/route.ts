import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { CartItem } from "@/types/cart";

// Initialize Stripe with secret key

const stripe = process.env.STRIPE_SECRET_API_KEY
  ? new Stripe(process.env.STRIPE_SECRET_API_KEY, {
      apiVersion: process.env.STRIPE_API_VERSION as any,
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();
    console.log("Checkout request received with items:", items?.length);

    if (!stripe) {
      console.error(
        "Stripe is not initialized. STRIPE_SECRET_KEY might be missing."
      );
      return NextResponse.json(
        { error: "Stripe configuration error" },
        { status: 500 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Convert cart items to Stripe line items
    const lineItems = items.map((item: CartItem) => {
      const { product, quantity } = item;

      // Calculate price after discount
      let unitAmount = product.price * 100; // Convert to cents

      if (product.isOnSale && product.discountPercentage) {
        const discountAmount = (unitAmount * product.discountPercentage) / 100;
        unitAmount = unitAmount - discountAmount;
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            description: product.description,
            images: [product.imageUrl],
          },
          unit_amount: Math.round(unitAmount), // Stripe requires integer
        },
        quantity: quantity,
      };
    });

    console.log(
      "Creating Stripe session with line items:",
      JSON.stringify(lineItems, null, 2)
    );

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/cancel`,
      metadata: {
        // You can add custom metadata here for tracking
        orderDate: new Date().toISOString(),
      },
    });

    console.log("Stripe session created:", session.id);

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error details:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
