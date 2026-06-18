import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/utils/supabase/client";

// In Next.js 15+, searchParams is a Promise. We must await it.
export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const categoryFilter = typeof params.category === "string" ? params.category : null;

  // Fetch from Supabase
  let query = supabase
    .from("products")
    .select("id, title, price, category, image_urls, is_featured")
    .order("created_at", { ascending: false });

  if (categoryFilter) {
    query = query.eq("category", categoryFilter);
  }

  const { data: products, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
  }

  const categoryLabels: Record<string, string> = {
    "womens-wear": "Women's Wear",
    jewelry: "Fine Jewelry",
    cosmetics: "Premium Cosmetics",
  };

  const displayCategory = categoryFilter ? categoryLabels[categoryFilter] || "Catalog" : "Our Full Collection";

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">{displayCategory}</h1>
        <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
          Browse our fine selection. See something you like? WhatsApp us to check availability.
        </p>
        
        {/* Simple inline category filters */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/catalog" className={`px-4 py-2 text-sm uppercase tracking-[0.15em] border ${!categoryFilter ? 'border-foreground text-foreground bg-foreground/5' : 'border-border text-foreground-muted hover:border-foreground hover:text-foreground transition-colors duration-300'}`}>
            All
          </Link>
          <Link href="/catalog?category=womens-wear" className={`px-4 py-2 text-sm uppercase tracking-[0.15em] border ${categoryFilter === 'womens-wear' ? 'border-foreground text-foreground bg-foreground/5' : 'border-border text-foreground-muted hover:border-foreground hover:text-foreground transition-colors duration-300'}`}>
            Women's Wear
          </Link>
          <Link href="/catalog?category=jewelry" className={`px-4 py-2 text-sm uppercase tracking-[0.15em] border ${categoryFilter === 'jewelry' ? 'border-foreground text-foreground bg-foreground/5' : 'border-border text-foreground-muted hover:border-foreground hover:text-foreground transition-colors duration-300'}`}>
            Jewelry
          </Link>
          <Link href="/catalog?category=cosmetics" className={`px-4 py-2 text-sm uppercase tracking-[0.15em] border ${categoryFilter === 'cosmetics' ? 'border-foreground text-foreground bg-foreground/5' : 'border-border text-foreground-muted hover:border-foreground hover:text-foreground transition-colors duration-300'}`}>
            Cosmetics
          </Link>
        </div>
      </div>

      {!products || products.length === 0 ? (
        <div className="py-32 text-center border border-border border-dashed bg-surface/30">
          <h3 className="text-2xl font-serif text-foreground mb-3">New Collections Arriving Soon</h3>
          <p className="text-foreground-muted max-w-md mx-auto leading-relaxed">
            We are currently updating our digital catalog for this season. Please check back later or visit us in-store to view our latest arrivals.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link key={product.id} href={`/catalog/${product.id}`} className="group block">
              <div className="relative aspect-[3/4] bg-surface mb-4 overflow-hidden border border-border/50">
                {product.image_urls && product.image_urls.length > 0 ? (
                  <Image
                    src={product.image_urls[0]}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-background text-foreground-muted/40 font-serif text-lg tracking-widest uppercase">
                    No Image
                  </div>
                )}
                
                {/* Status Badge */}
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-md px-3 py-1.5 text-[10px] uppercase tracking-widest text-foreground font-medium border border-border/50 shadow-sm">
                  Available
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.15em] text-foreground-muted mb-1.5">
                  {categoryLabels[product.category] || product.category}
                </span>
                <h3 className="text-lg font-serif text-foreground truncate group-hover:text-gold transition-colors duration-300">
                  {product.title}
                </h3>
                {product.price ? (
                  <span className="text-sm text-foreground-muted mt-1 font-medium tracking-wide">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                ) : (
                  <span className="text-sm text-foreground-muted mt-1 italic">
                    Price on request
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
