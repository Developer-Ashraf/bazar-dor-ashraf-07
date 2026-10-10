import Link from "next/link";
import { Product } from "@/lib/api";
import { toBanglaNumber, formatChange } from "@/lib/utils";

interface PriceTickerProps {
  products: Product[];
}

export default function PriceTicker({ products }: PriceTickerProps) {
  if (!products || products.length === 0) return null;

  // Repeat products to create smooth infinite scrolling effect
  const tickerItems = [...products, ...products];

  return (
    <div className="bg-gray-50 border-b border-gray-200 overflow-hidden py-2.5 relative select-none">
      <div className="flex w-max animate-ticker hover:[animation-play-state:paused]">
        {tickerItems.map((item, idx) => {
          const changeInfo = formatChange(item.change?.pct, item.change?.dir);
          return (
            <Link
              key={`${item.slug}-${idx}`}
              href={`/product/${item.slug}`}
              className="flex items-center gap-2 px-4 border-r border-gray-200 text-xs sm:text-sm whitespace-nowrap text-gray-700 hover:text-emerald-700 transition-colors"
            >
              <span className="text-base">{item.image}</span>
              <span className="font-semibold text-gray-900">{item.nameBn}</span>
              <span className="text-gray-500 font-medium">
                {toBanglaNumber(item.today)} টাকা/{item.unit === "kg" ? "কেজি" : item.unit === "liter" ? "লিটার" : item.unit === "dozen" ? "ডজন" : "পিস"}
              </span>
              <span className={`font-bold px-1.5 py-0.5 rounded text-xs ${changeInfo.color} ${changeInfo.bg}`}>
                {changeInfo.text}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
