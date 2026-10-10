"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { User, LogOut, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();

  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না!");
      return;
    }

    try {
      setIsUpdating(true);
      // Better-auth update user API (Challenge C3)
      const res = await authClient.updateUser({
        name: name.trim(),
      });

      if (res.error) {
        toast.error(res.error.message || "নাম পরিবর্তন করতে সমস্যা হয়েছে!");
      } else {
        toast.success("নাম সফলভাবে আপডেট করা হয়েছে!");
        if (refetch) await refetch();
        router.refresh();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "আপডেট ব্যর্থ হয়েছে";
      toast.error(msg);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট করা হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে!");
    }
  };

  if (isPending) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 font-medium">প্রোফাইল লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
          🔒
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          প্রোফাইল অ্যাক্সেস করা সম্ভব নয়
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          আপনার প্রোফাইল দেখতে অনুগ্রহ করে প্রথমে সাইন ইন করুন।
        </p>
        <Link
          href="/signin?callbackUrl=/profile"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 text-white font-semibold text-sm hover:bg-emerald-800 transition-colors"
        >
          <span>সাইন ইন করুন</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          আমার প্রোফাইল
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* Top Profile Card (Matches Figma 'Profile.png') */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xl border border-emerald-100 overflow-hidden shrink-0">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              session.user.name?.[0]?.toUpperCase() || <User className="w-8 h-8" />
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {session.user.name || "ব্যবহারকারী"}
            </h2>
            <p className="text-sm text-gray-500">{session.user.email}</p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-2 px-4 py-2 border border-rose-200 text-rose-600 rounded-xl text-sm font-semibold hover:bg-rose-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>সাইন আউট</span>
        </button>
      </div>

      {/* Information Update Form Card (Challenge C3) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs">
        <h3 className="text-lg font-bold text-gray-900 mb-4">তথ্য</h3>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label
              htmlFor="profileName"
              className="block text-sm font-semibold text-gray-700 mb-1.5"
            >
              নাম
            </label>
            <input
              id="profileName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম লিখুন"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-gray-900 text-sm"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isUpdating}
              className="w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-xs text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 disabled:opacity-50 cursor-pointer transition-colors"
            >
              {isUpdating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "আপডেট"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
