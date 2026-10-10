import Hero from "@/components/hero/Hero";
import ProductCard from "@/components/product/ProductCard";
import { getAllProducts } from "@/lib/api";
import { toBanglaNumber } from "@/lib/utils";
import { TrendingUp, TrendingDown, LayoutGrid } from "lucide-react";

export default async function HomePage() {
  const products = await getAllProducts();

  // 1. Top 6 Risers (দাম বেড়েছে ▲)
  const risers = [...products]
    .filter((p) => p.change && (p.change.dir === "up" || p.change.pct > 0))
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // 2. Top 6 Fallers (দাম কমেছে ▼)
  const fallers = [...products]
    .filter((p) => p.change && (p.change.dir === "down" || p.change.pct < 0))
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="space-y-12 pb-20">
      {/* 2. Hero Section */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section A: আজ দাম বেড়েছে ▲ */}
        {risers.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-rose-600 font-black text-lg">▲</span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                আজ দাম বেড়েছে
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {risers.map((product) => (
                <ProductCard key={`riser-${product.id}`} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Section B: আজ দাম কমেছে ▼ */}
        {fallers.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-emerald-700 font-black text-lg">▼</span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                আজ দাম কমেছে
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {fallers.map((product) => (
                <ProductCard key={`faller-${product.id}`} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Section C: সব পণ্য */}
        <section id="সব-পণ্য" className="scroll-mt-36">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              সব পণ্য
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <ProductCard key={`all-${product.id}`} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
