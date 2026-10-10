# বাজার দর (BazarDor) - প্রকল্প বাস্তবায়ন ও আর্কিটেকচার পরিকল্পনা

**প্রকল্প ডিরেক্টরি:** `C:\Projects\NextJs\Assignment\bazar-dor-ashraf-07`  
**টেকনোলজি স্ট্যাক:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Better Auth, MongoDB Native/Mongoose  
**স্টাইল রেফারেন্স:** `public/images/*.png` (হুবহু ফিগমা ডিজাইন)

---

## ১. যাচাইকরণ ও প্রি-ফ্লাইট স্ট্যাটাস (Verification Status)

- [x] **API Connectivity:**
  - Base URL 1: `https://api.api-store.workers.dev/api/bazardor` (সফলভাবে রেসপন্স করছে)
  - Endpoints টেস্ট করা হয়েছে: `/products`, `/categories`
- [x] **MongoDB Cluster:**
  - Cluster Host: `cluster0.i3lu0gl.mongodb.net` (Port 27017 Reachable & Resolved)
  - Database URI: `mongodb+srv://bazar-dor-ashraf-07:96COOdltO3FZvk7N@cluster0.i3lu0gl.mongodb.net/bazar_dor?retryWrites=true&w=majority&appName=Cluster0`
- [x] **ডিজাইন ফাইলসমূহ পর্যালোচনা:**
  - `Home.png`, `Home - User Menu Open.png`, `Category.png`, `Product Details.png`, `Profile.png`, `Sign In.png`, `Sign Up.png` সবগুলো বিস্তারিত দেখা হয়েছে। কালার প্যালেট, টাইপোগ্রাফি (বাংলা ফন্ট ও ডিজিট), স্পেসিং নিখুঁতভাবে চিহ্নিত।

---

## ২. আর্কিটেকচার ও রাউটিং স্ট্রাকচার (App Router Architecture)

```
src/
├── app/
│   ├── layout.tsx                # গ্লোবাল লেআউট (Navbar, Ticker, Footer, Toast Toaster)
│   ├── page.tsx                  # হোমপেজ (Hero, আজ দাম বেড়েছে, আজ দাম কমেছে, সব পণ্য)
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx          # ক্যাটাগরি পেজ (সর্টিং ফিল্টার, পণ্য গ্রিড, এম্পটি স্টেট)
│   ├── product/
│   │   └── [slug]/
│   │       └── page.tsx          # প্রোডাক্ট ডিটেইলস (Protected Route, বাজারভিত্তিক দাম, গড়/সর্বনিম্ন/সর্বোচ্চ)
│   ├── profile/
│   │   ├── page.tsx              # প্রোফাইল ভিউ ও সাইনআউট
│   │   └── update/               # অথবা প্রোফাইল পেইজেই ইনপুট আপডেট (Better Auth update-user)
│   │       └── page.tsx          # নাম আপডেট ফর্ম (Challenge C3)
│   ├── signin/
│   │   └── page.tsx              # সাইন ইন পেজ (Email/Password + Social Mock/OAuth + Toasts)
│   ├── signup/
│   │   └── page.tsx              # সাইন আপ পেজ (Name, Email, Password, Confirm Password)
│   ├── api/
│   │   └── auth/
│   │       └── [...all]/
│   │           └── route.ts      # Better Auth API হ্যান্ডলার
│   └── not-found.tsx             # ফ্রেন্ডলি ৪MD বাংলা ৪MD পেজ ("হোম পেজে ফিরে যান")
├── components/
│   ├── navbar/                   # লোগো, বাংলা তারিখ, ক্যাটাগরি পিলস, ইউজার ড্রপডাউন/বাটন
│   ├── ticker/                   # ইনফিনিট স্ক্রলিং প্রাইস মারকুই
│   ├── hero/                     # ব্যানার হেডিং, সাবটাইটেল, CTA স্ক্রল বাটন, ইলাস্ট্রেশন
│   ├── product/                  # ProductCard, ProductGrid, PriceBadge, MarketTable
│   ├── ui/                       # SkeletonLoader, Toast, Modal, Dropdown
│   └── footer/                   # ফিগমা অনুযায়ী ফুটার
├── lib/
│   ├── auth.ts                   # Better Auth সার্ভার কনফিগারেশন (MongoDB Adapter)
│   ├── auth-client.ts            # Better Auth ক্লায়েন্ট হুক্স (signIn, signUp, signOut, useSession)
│   ├── mongodb.ts                # MongoDB ক্লায়েন্ট কানেকশন
│   ├── api.ts                    # API ফেচিং হেল্পার (Fallback URL সহ)
│   └── utils.ts                  # বাংলা ডিজিট কনভার্টার (toBanglaNumber), তারিখ ফরম্যাটার
```

---

## ৩. গুরুত্বপূর্ণ ফিচার ও বাস্তবায়ন পরিকল্পনা

### ক. বাংলা সংখ্যা ও সর্টিং (Challenge C1):
- যেকোনো সংখ্যাকে বাংলায় কনভার্ট করার হেল্পার ফাংশন: `toBanglaNumber(value)` এবং কারেন্সি ফরম্যাট `১২৫ টাকা`।
- সর্টিং ড্রপডাউন: "ডিফল্ট", "দাম: কম থেকে বেশি", "দাম: বেশি থেকে কম"। ড্রপডাউনে নিউমেরিক ভ্যালুর ওপর সর্ট হবে যাতে বাংলা সংখ্যার ক্ষেত্রেও নিখুঁত ফলাফল আসে।

### খ. অথেনটিকেশন ও প্রোটেক্টেড রাউট (Better Auth + MongoDB):
- Better Auth দিয়ে ইমেইল/পাসওয়ার্ড ক্রেডেনশিয়াল প্রোভাইডার কনফিগার করা হবে।
- `/product/[slug]` প্রোটেক্টেড রাখা হবে; লগইন ছাড়া ঢুকলে টোস্ট মেসেজ সহ সাইন-ইন পেজে রিডাইরেক্ট করবে (লগইনের পর পুনরায় সেই প্রোডাক্ট পেজে নিয়ে আসবে)।
- প্রোফাইল আপডেটে Better Auth এর client `authClient.updateUser({ name: newName })` ব্যবহার করা হবে (Challenge C3)।

### গ. হোম পেজ ও সেকশন বিন্যাস:
- **Hero:** "আজকের বাজারের দাম এক নজরে" + ঝুড়ি ইলাস্ট্রেশন + "সব পণ্য দেখুন" বাটন যা মসৃণভাবে `#সব-পণ্য` এ স্ক্রোল করবে।
- **Section A (আজ দাম বেড়েছে ▲):** শতাংশ পরিবর্তনের ভিত্তিতে টপ ৬ টি রাইজার কার্ড (সবুজ/লাল অ্যারো ব্যাজ)।
- **Section B (আজ দাম কমেছে ▼):** টপ ৬ টি ফলার কার্ড।
- **Section C (সব পণ্য):** সম্পূর্ণ পণ্যের রেসপনসিভ গ্রিড।
- **প্রোডাক্ট ডিটেইলস:** সামগ্রিক গড়, সর্বনিম্ন, সর্বোচ্চ দাম এবং বাজারভিত্তিক আজকের দামের সুন্দর টেবিল।

### ঘ. গিট কমিট ও ডকুমেন্টেশন (C2):
- কমপক্ষে ৮-১০টি অর্থপূর্ণ গিট কমিট করা হবে (`feat: ...`, `fix: ...`)।
- আকর্ষণীয় README.md তৈরি করা হবে স্ক্রিনশট, লাইভ লিংক, টেকনোলজি ও ফিচারের বিস্তারিত তালিকা সহ।
