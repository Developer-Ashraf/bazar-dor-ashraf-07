import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-24 h-24 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-4xl mb-6 shadow-xs">
        <ShoppingBag className="w-12 h-12 text-emerald-700" />
      </div>

      <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-3">
        ৪০৪ - পাতাটি পাওয়া যায়নি
      </h1>
      <p className="text-base sm:text-lg text-gray-500 max-w-md mb-8">
        আপনি যে পৃষ্ঠাটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ভুল ঠিকানায় প্রবেশ করেছেন।
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-xs transition-all cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>হোম পেজে ফিরে যান</span>
      </Link>
    </div>
  );
}
