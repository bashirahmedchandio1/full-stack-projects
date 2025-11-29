import { Product } from "@/types/product";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return <ProductDetailClient productId={params.id} />;
}

// Generate static params for SSG
export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/products`
    );
    const data = await response.json();

    if (data.success) {
      return data.data.map((product: Product) => ({
        id: product.id,
      }));
    }
  } catch (error) {
    console.error("Error generating static params:", error);
  }

  return [];
}
