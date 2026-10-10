export interface MarketData {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface ProductPriceChange {
  dir: "up" | "down" | "flat";
  pct: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: ProductPriceChange;
  markets: MarketData[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const PRIMARY_API = process.env.NEXT_PUBLIC_API_URL_1 || "https://api.api-store.workers.dev/api/bazardor";
const FALLBACK_API = process.env.NEXT_PUBLIC_API_URL_2 || "https://api.abcz.workers.dev/api/bazardor";

async function fetchWithFallback<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${PRIMARY_API}${endpoint}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Primary failed with status: ${res.status}`);
    const data = await res.json();
    return data as T;
  } catch (error) {
    console.warn(`Primary API failed for ${endpoint}, switching to fallback...`, error);
    const res = await fetch(`${FALLBACK_API}${endpoint}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`Fallback also failed with status: ${res.status}`);
    const data = await res.json();
    return data as T;
  }
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const data = await fetchWithFallback<{ value?: Product[]; products?: Product[] } | Product[]>("/products");
    if (Array.isArray(data)) return data;
    if ("value" in data && Array.isArray(data.value)) return data.value;
    if ("products" in data && Array.isArray(data.products)) return data.products;
    return [];
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await fetchWithFallback<{ value?: Category[]; categories?: Category[] } | Category[]>("/categories");
    if (Array.isArray(data)) return data;
    if ("value" in data && Array.isArray(data.value)) return data.value;
    if ("categories" in data && Array.isArray(data.categories)) return data.categories;
    return [];
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    return [];
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const data = await fetchWithFallback<{ value?: Product[]; products?: Product[] } | Product[]>(`/products?category=${categorySlug}`);
    if (Array.isArray(data)) return data;
    if ("value" in data && Array.isArray(data.value)) return data.value;
    if ("products" in data && Array.isArray(data.products)) return data.products;
    return [];
  } catch (err) {
    console.error(`Failed to fetch category products for ${categorySlug}:`, err);
    return [];
  }
}

export async function getProductByIdOrSlug(idOrSlug: string | number): Promise<Product | null> {
  try {
    const data = await fetchWithFallback<Product>(`/products/${idOrSlug}`);
    if (data && data.nameBn) return data;
    return null;
  } catch (err) {
    console.warn(`Single product fetch failed for ${idOrSlug}, searching in all products list:`, err);
    const all = await getAllProducts();
    const found = all.find(p => p.slug === idOrSlug || p.id.toString() === idOrSlug.toString());
    return found || null;
  }
}
