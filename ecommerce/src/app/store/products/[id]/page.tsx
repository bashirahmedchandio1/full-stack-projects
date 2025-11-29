import { Product } from "@/types/product";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";
import { getAllProducts } from "@/data/products-data";

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
    const products = getAllProducts();

    return products.map((product: Product) => ({
      id: product.id,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
  }

  return [];
}
