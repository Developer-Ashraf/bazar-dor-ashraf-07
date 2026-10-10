"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { ShoppingCart, User, LogOut, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import BanglaDateDisplay from "@/components/ui/BanglaDateDisplay";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface NavbarProps {
  categories: Category[];
}

export default function Navbar({ categories }: NavbarProps) {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট করা হয়েছে!");
      setUserMenuOpen(false);
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে!");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      {/* Top Bar: Logo, Date & Auth */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 border-b border-gray-50">
          {/* Logo & Bangla Date */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:bg-emerald-800 transition-colors">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-1.5">
                বাজার দর
              </div>
              <div className="text-xs text-gray-500 font-medium tracking-wide">
                <BanglaDateDisplay />
              </div>
            </div>
          </Link>

          {/* Right Auth Section */}
          <div className="flex items-center gap-3">
            {isPending ? (
              <div className="h-10 w-28 bg-gray-100 animate-pulse rounded-xl" />
            ) : session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full hover:bg-gray-50 border border-gray-200 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm overflow-hidden">
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      session.user.name?.[0]?.toUpperCase() || <User className="w-4 h-4" />
                    )}
                  </div>
                  <span className="text-sm font-semibold text-gray-800 hidden sm:inline-block max-w-[120px] truncate">
                    {session.user.name || "ব্যবহারকারী"}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu (Matches Figma 'Home - User Menu Open.png') */}
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="pb-3 border-b border-gray-100">
                        <p className="font-bold text-gray-900 text-base truncate">
                          {session.user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {session.user.email}
                        </p>
                      </div>

                      <div className="pt-2 space-y-1">
                        <Link
                          href="/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-emerald-700 transition-colors"
                        >
                          <User className="w-4 h-4 text-gray-400" />
                          আমার প্রোফাইল
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          সাইন আউট
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/signin"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-emerald-700 transition-colors rounded-xl"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Second Row: Category navigation pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none text-sm font-medium no-scrollbar">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.id || cat.slug}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full whitespace-nowrap transition-all duration-150 text-sm ${
                  isActive
                    ? "bg-emerald-700 text-white font-semibold shadow-xs"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
