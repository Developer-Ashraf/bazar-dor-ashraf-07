import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { getCategories, getAllProducts } from "@/lib/api";
import Navbar from "@/components/navbar/Navbar";
import PriceTicker from "@/components/ticker/PriceTicker";
import Footer from "@/components/footer/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "বাজার দর (BazarDor) - প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার বাজারভিত্তিক আজকের দাম, সর্বনিম্ন ও সর্বোচ্চ দামের সার্বিক তথ্য।",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getAllProducts(),
  ]);

  return (
    <html lang="bn" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#f8faf8] text-gray-900">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: "#333",
              color: "#fff",
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: {
              style: {
                background: "#047857",
              },
            },
            error: {
              style: {
                background: "#e11d48",
              },
            },
          }}
        />
        <Suspense fallback={<div className="h-32 bg-white border-b border-gray-100" />}>
          <Navbar categories={categories} />
        </Suspense>
        <PriceTicker products={products} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
