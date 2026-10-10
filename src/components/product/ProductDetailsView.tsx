import Link from "next/link";
import { Product } from "@/lib/api";
import { toBanglaNumber, formatChange } from "@/lib/utils";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { ChevronRight } from "lucide-react";

interface ProductDetailsViewProps {
  product: Product;
}

export default function ProductDetailsView({ product }: ProductDetailsViewProps) {
  const changeInfo = formatChange(product.change?.pct, product.change?.dir);

  // Unit translation
  const unitText =
    product.unit === "kg"
      ? "প্রতি কেজি"
      : product.unit === "liter"
      ? "প্রতি লিটার"
      : product.unit === "dozen"
      ? "প্রতি ডজন"
      : "প্রতি পিস";

  // Calculate summary metrics (min, max, avg) across all markets
  const allMins = (product.markets || []).map((m) => m.min).filter(Boolean);
  const allMaxs = (product.markets || []).map((m) => m.max).filter(Boolean);

  const minPrice = allMins.length > 0 ? Math.min(...allMins) : product.today;
  const maxPrice = allMaxs.length > 0 ? Math.max(...allMaxs) : product.today;

  // Average calculation
  const totalMinMaxSum = (product.markets || []).reduce(
    (acc, cur) => acc + (cur.min + cur.max) / 2,
    0
  );
  const avgPrice =
    product.markets && product.markets.length > 0
      ? Math.round(totalMinMaxSum / product.markets.length)
      : product.today;

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium">
          <Link href="/" className="hover:text-emerald-700 transition-colors">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link
            href={`/category/${product.category}`}
            className="hover:text-emerald-700 transition-colors"
          >
            {product.categoryNameBn || "ক্যাটাগরি"}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-semibold">{product.nameBn}</span>
        </nav>

        {/* Top Product Summary Card (Matches Figma 'Product Details.png') */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center text-4xl border border-gray-100 shrink-0">
              {product.image}
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="text-sm text-gray-500 font-medium">
                {unitText} • {product.categoryNameBn}
              </p>
              <p className="text-xs text-gray-400 pt-1">
                গতকালের তুলনায় আজ দাম {product.change?.dir === "up" ? "বেড়েছে" : product.change?.dir === "down" ? "কমেছে" : "অপরিবর্তিত"}
              </p>
            </div>
          </div>

          {/* Today's Price Widget */}
          <div className="w-full md:w-auto bg-gray-50/80 rounded-2xl p-5 border border-gray-100 text-center md:text-right shrink-0">
            <span className="text-xs text-gray-500 font-medium block">আজকের দাম</span>
            <div className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight my-1">
              {toBanglaNumber(product.today)}
            </div>
            <div className="text-xs text-gray-500 mb-2">
              টাকা / {product.unit === "kg" ? "কেজি" : product.unit === "liter" ? "লিটার" : product.unit === "dozen" ? "ডজন" : "পিস"}
            </div>
            <div
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${changeInfo.color} ${changeInfo.bg}`}
            >
              <span>{changeInfo.text}</span>
            </div>
          </div>
        </div>

        {/* Price Summary Cards (দামের সারসংক্ষেপ) */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Min Price */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
              <span className="text-xs text-gray-500 block font-medium">সর্বনিম্ন দাম</span>
              <div className="text-2xl font-black text-emerald-700 my-1">
                {toBanglaNumber(minPrice)} টাকা
              </div>
              <span className="text-xs text-gray-400">সবচেয়ে কম দামের বাজার</span>
            </div>

            {/* Max Price */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
              <span className="text-xs text-gray-500 block font-medium">সর্বাধিক দাম</span>
              <div className="text-2xl font-black text-rose-600 my-1">
                {toBanglaNumber(maxPrice)} টাকা
              </div>
              <span className="text-xs text-gray-400">সবচেয়ে বেশি দামের বাজার</span>
            </div>

            {/* Avg Price */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
              <span className="text-xs text-gray-500 block font-medium">গড় দাম</span>
              <div className="text-2xl font-black text-emerald-800 my-1">
                {toBanglaNumber(avgPrice)} টাকা
              </div>
              <span className="text-xs text-gray-400">প্রতি {product.unit === "kg" ? "কেজি" : product.unit === "liter" ? "লিটার" : product.unit === "dozen" ? "ডজন" : "পিস"}-এর হিসাবে</span>
            </div>
          </div>
        </div>

        {/* Bazar-based Today's Prices Table (বাজারভিত্তিক আজকের দাম) */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-gray-50/75 border-b border-gray-100 text-gray-600 font-semibold text-xs sm:text-sm">
                    <th className="py-4 px-6">বাজার</th>
                    <th className="py-4 px-6">বিভাগ</th>
                    <th className="py-4 px-6">সর্বনিম্ন</th>
                    <th className="py-4 px-6">সর্বাধিক</th>
                    <th className="py-4 px-6 text-right">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {product.markets && product.markets.length > 0 ? (
                    product.markets.map((m, idx) => {
                      const itemAvg = Math.round((m.min + m.max) / 2);
                      return (
                        <tr
                          key={`${m.market}-${idx}`}
                          className="hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="py-4 px-6 font-semibold text-gray-900">
                            {m.market}
                          </td>
                          <td className="py-4 px-6 text-gray-500">
                            {m.division}
                          </td>
                          <td className="py-4 px-6 text-gray-700 font-medium">
                            {toBanglaNumber(m.min)} টাকা
                          </td>
                          <td className="py-4 px-6 text-gray-700 font-medium">
                            {toBanglaNumber(m.max)} টাকা
                          </td>
                          <td className="py-4 px-6 font-bold text-gray-900 text-right">
                            {toBanglaNumber(itemAvg)} টাকা
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-400">
                        বাজারভিত্তিক তথ্য পাওয়া যায়নি।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
