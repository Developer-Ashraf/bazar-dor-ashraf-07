"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const hasAlertedRef = useRef(false);

  useEffect(() => {
    if (!isPending && !session?.user && !hasAlertedRef.current) {
      hasAlertedRef.current = true;
      toast.error("পণ্যের বিস্তারিত দেখতে অনুগ্রহ করে সাইন ইন করুন!", {
        id: "auth-protected-toast", // Unique ID prevents duplicate toasts
      });
      router.replace(`/signin?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [session, isPending, router, pathname]);

  if (isPending) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-500 font-medium">অ্যাকাউন্ট ভেরিফাই করা হচ্ছে...</p>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return <>{children}</>;
}
