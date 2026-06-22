import { unstable_cache } from "next/cache";
import { supabase } from "@/utils/supabase/client";

export type Product = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  price: number | null;
  image_urls: string[] | null;
  is_featured: boolean | null;
  created_at: string;
};

const PRODUCT_COLUMNS =
  "id, title, description, price, category, image_urls, is_featured, created_at";

export const getCachedProducts = unstable_cache(
  async (categoryFilter: string | null) => {
    let query = supabase
      .from("products")
      .select(PRODUCT_COLUMNS)
      .order("created_at", { ascending: false });

    if (categoryFilter) {
      query = query.eq("category", categoryFilter);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching products:", error);
      return [] as Product[];
    }
    return (data ?? []) as Product[];
  },
  ["products-list"],
  { revalidate: 60, tags: ["products"] },
);

export const getCachedProduct = unstable_cache(
  async (id: string) => {
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_COLUMNS)
      .eq("id", id)
      .single();
    if (error || !data) return null;
    return data as Product;
  },
  ["product-detail"],
  { revalidate: 60, tags: ["products"] },
);