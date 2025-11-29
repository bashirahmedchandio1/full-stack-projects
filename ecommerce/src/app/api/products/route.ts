import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  getAllProducts,
  getProductsByCategory,
  getOnSaleProducts,
  createProduct,
} from "@/data/products-data";

// Zod schema for product creation
const createProductSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().positive("Price must be positive"),
  discountPercentage: z.number().min(0).max(100).optional(),
  isOnSale: z.boolean(),
  saleEndsAt: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Invalid image URL"),
  description: z.string().min(1, "Description is required"),
});

// GET /api/products - Get all products with optional filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const onSale = searchParams.get("onSale");

    let products = getAllProducts();

    // Filter by category if provided
    if (category) {
      products = getProductsByCategory(category);
    }

    // Filter by sale status if provided
    if (onSale === "true") {
      products = products.filter((p) => p.isOnSale);
    }

    return NextResponse.json(
      {
        success: true,
        data: products,
        count: products.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = createProductSchema.parse(body);

    // Create product
    const newProduct = createProduct(validatedData);

    return NextResponse.json(
      {
        success: true,
        data: newProduct,
        message: "Product created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          details: error.issues,
        },
        { status: 400 }
      );
    }

    console.error("Error creating product:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create product",
      },
      { status: 500 }
    );
  }
}
