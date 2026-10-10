import { Suspense } from "react";
import { getCategories, getProductsByCategory } from "@/lib/api";
import CategoryView from "@/components/category/CategoryView";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function CategoryContent({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProductsByCategory(slug),
  ]);

  const category = categories.find((c) => c.slug === slug) || null;

  return (
    <CategoryView
      category={category}
      products={products}
      categorySlug={slug}
    />
  );
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse space-y-6">
          <div className="h-28 bg-white rounded-3xl border border-gray-100" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-32 bg-white rounded-2xl border border-gray-100" />
            ))}
          </div>
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}
