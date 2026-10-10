import Link from "next/link";
import { Product } from "@/lib/api";
import { toBanglaNumber, formatChange } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const changeInfo = formatChange(product.change?.pct, product.change?.dir);

  // Translate unit to Bengali
  const unitText =
    product.unit === "kg"
      ? "প্রতি কেজি"
      : product.unit === "liter"
      ? "প্রতি লিটার"
      : product.unit === "dozen"
      ? "প্রতি ডজন"
      : "প্রতি পিস";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all duration-200 relative"
    >
      <div className="flex items-start gap-3.5">
        {/* Emoji Avatar */}
        <div className="w-12 h-12 rounded-2xl bg-gray-50 group-hover:bg-emerald-50 flex items-center justify-center text-2xl shrink-0 transition-colors border border-gray-100">
          <span>{product.image}</span>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-base group-hover:text-emerald-700 transition-colors truncate">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500 font-medium mt-0.5">
            {unitText}
          </p>
        </div>
      </div>

      {/* Price and Change Badge */}
      <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
        <div>
          <span className="text-[11px] text-gray-400 block font-medium">আজকের দাম</span>
          <span className="text-lg font-extrabold text-gray-900 tracking-tight">
            {toBanglaNumber(product.today)} টাকা
          </span>
        </div>

        <div
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${changeInfo.color} ${changeInfo.bg}`}
        >
          <span>{changeInfo.text}</span>
        </div>
      </div>
    </Link>
  );
}
