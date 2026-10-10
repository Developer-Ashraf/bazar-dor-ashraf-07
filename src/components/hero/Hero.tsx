import Link from "next/link";
import BanglaDateDisplay from "@/components/ui/BanglaDateDisplay";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-white border-b border-gray-100 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f2f7f4] rounded-3xl p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-emerald-50 relative overflow-hidden">
          {/* Left Text Content */}
          <div className="max-w-xl space-y-4 text-center md:text-left z-10">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-emerald-100 text-emerald-800 text-xs sm:text-sm font-medium">
              <BanglaDateDisplay />
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন এবং সর্বোচ্চ দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="#সব-পণ্য"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-base shadow-sm transition-all duration-200 cursor-pointer"
              >
                <span>সব পণ্য দেখুন</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Hero Illustration (Market basket) */}
          <div className="relative w-64 sm:w-72 md:w-80 h-52 sm:h-64 flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 320 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-md"
            >
              {/* Basket Shadow */}
              <ellipse cx="160" cy="245" rx="100" ry="12" fill="#e2ebe5" />
              
              {/* Fruits and Vegetables inside basket */}
              {/* Green Apple/Guava */}
              <circle cx="190" cy="110" r="32" fill="#10b981" />
              <path d="M190 80 Q195 65 205 60" stroke="#047857" strokeWidth="4" strokeLinecap="round" />
              <path d="M190 75 Q180 70 178 78 Q185 85 190 75" fill="#34d399" />
              
              {/* Red Tomato */}
              <circle cx="140" cy="120" r="30" fill="#ef4444" />
              <path d="M140 92 Q143 85 145 80" stroke="#b91c1c" strokeWidth="3" strokeLinecap="round" />
              <path d="M140 90 Q130 87 132 94 Q138 98 140 90" fill="#22c55e" />

              {/* Orange */}
              <circle cx="230" cy="140" r="28" fill="#f97316" />
              
              {/* Purple Brinjal / Grapes */}
              <circle cx="95" cy="145" r="24" fill="#8b5cf6" />
              <circle cx="115" cy="135" r="20" fill="#a78bfa" />
              
              {/* Yellow Lemon / Banana */}
              <circle cx="170" cy="145" r="22" fill="#eab308" />

              {/* Basket Body */}
              <path
                d="M80 140 H240 L220 230 H100 Z"
                fill="#b45309"
              />
              {/* Basket Texture lines */}
              <path d="M110 140 L120 230" stroke="#92400e" strokeWidth="3" />
              <path d="M140 140 L145 230" stroke="#92400e" strokeWidth="3" />
              <path d="M170 140 L170 230" stroke="#92400e" strokeWidth="3" />
              <path d="M200 140 L195 230" stroke="#92400e" strokeWidth="3" />
              <path d="M225 140 L215 230" stroke="#92400e" strokeWidth="3" />
              {/* Basket Rim */}
              <rect x="75" y="132" width="170" height="12" rx="6" fill="#78350f" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
