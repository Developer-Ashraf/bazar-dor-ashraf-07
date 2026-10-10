import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProductByIdOrSlug } from "@/lib/api";
import ProductDetailsView from "@/components/product/ProductDetailsView";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function ProductContent({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductByIdOrSlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailsView product={product} />;
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse space-y-6">
          <div className="h-6 w-48 bg-gray-200 rounded-md" />
          <div className="h-40 bg-white rounded-3xl border border-gray-100" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="h-28 bg-white rounded-2xl" />
            <div className="h-28 bg-white rounded-2xl" />
            <div className="h-28 bg-white rounded-2xl" />
          </div>
        </div>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}
