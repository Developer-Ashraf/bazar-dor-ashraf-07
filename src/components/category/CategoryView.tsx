"use client";

import { useState } from "react";
import Link from "next/link";
import { Product, Category } from "@/lib/api";
import ProductCard from "@/components/product/ProductCard";
import { toBanglaNumber } from "@/lib/utils";
import { ChevronDown, ArrowLeft } from "lucide-react";

interface CategoryViewProps {
  category: Category | null;
  products: Product[];
  categorySlug: string;
}

type SortOption = "default" | "price-asc" | "price-desc";

export default function CategoryView({
  category,
  products,
  categorySlug,
}: CategoryViewProps) {
  const [sortOption, setSortOption] = useState<SortOption>("default");

  // Handle Sort based on Numeric Value (Requirement C1)
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "price-asc") {
      return a.today - b.today;
    }
    if (sortOption === "price-desc") {
      return b.today - a.today;
    }
    return 0; // default order
  });

  // Empty State / Invalid Category handler
  if (!category && products.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
          🔍
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          কোনো পণ্য পাওয়া যায়নি
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          এই ক্যাটাগরিতে বর্তমানে কোনো বাজার দরের তথ্য নেই অথবা ক্যাটাগরিটি বিদ্যমান নয়।
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    );
  }

  const categoryName = category?.nameBn || "ক্যাটাগরি";
  const categoryIcon = category?.icon || "🛒";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Category Banner Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl border border-gray-100 shrink-0">
          {categoryIcon}
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {categoryName}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {toBanglaNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* Filter and Sorting Row (Challenge C1) */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-center justify-end gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <label htmlFor="sort" className="text-sm font-medium text-gray-600">
            সাজান:
          </label>
          <div className="relative">
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="appearance-none bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 text-sm font-semibold rounded-xl py-2 pl-4 pr-10 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 cursor-pointer transition-colors"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-asc">দাম: কম থেকে বেশি</option>
              <option value="price-desc">দাম: বেশি থেকে কম</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Product count text */}
      <p className="text-xs sm:text-sm text-gray-500 font-medium">
        মোট {toBanglaNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {sortedProducts.map((product) => (
          <ProductCard key={`cat-prod-${product.id}`} product={product} />
        ))}
      </div>
    </div>
  );
}
