import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/utils/supabase/client";
import { notFound } from "next/navigation";

// Store phone number (include country code, without '+' or spaces)
const STORE_PHONE_NUMBER = "918910740057"; 

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // Fetch product from Supabase
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    return (
      <div className="py-32 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif text-foreground mb-4">Product Not Found</h1>
        <p className="text-foreground-muted mb-8">The item you are looking for does not exist or has been removed.</p>
        <Link href="/catalog" className="text-sm uppercase tracking-widest text-gold hover:text-foreground transition-colors border-b border-gold/30 pb-1">
          &larr; Return to Catalog
        </Link>
      </div>
    );
  }

  const categoryLabels: Record<string, string> = {
    "womens-wear": "Women's Wear",
    jewelry: "Fine Jewelry",
    cosmetics: "Premium Cosmetics",
  };
  const displayCategory = categoryLabels[product.category] || product.category;

  // Construct WhatsApp Inquiry Message
  // Using a fallback to localhost if NEXT_PUBLIC_SITE_URL isn't set yet
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const pageUrl = `${baseUrl}/catalog/${product.id}`;
  
  const message = `Hi Gulmohar! I saw the ${product.title} (${displayCategory}) on your website catalog and wanted to check if it's currently available in the shop to view. ${pageUrl}`;
  const whatsappUrl = `https://wa.me/${STORE_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      
      {/* Breadcrumb Navigation */}
      <nav className="mb-8 text-sm flex items-center gap-2 text-foreground-muted uppercase tracking-[0.1em]">
        <Link href="/catalog" className="hover:text-foreground transition-colors">Catalog</Link>
        <span>/</span>
        <Link href={`/catalog?category=${product.category}`} className="hover:text-foreground transition-colors">{displayCategory}</Link>
        <span>/</span>
        <span className="text-foreground truncate max-w-[200px] sm:max-w-none">{product.title}</span>
      </nav>

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Image Showcase */}
        <div className="relative aspect-[3/4] md:aspect-[4/5] bg-surface border border-border w-full overflow-hidden">
          {product.image_urls && product.image_urls.length > 0 ? (
            <Image
              src={product.image_urls[0]}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-foreground-muted/40 font-serif text-xl tracking-widest uppercase bg-surface">
              No Image Available
            </div>
          )}
        </div>

        {/* Right Column: Product Details */}
        <div className="flex flex-col sticky top-28">
          <div className="mb-2">
            <span className="text-xs uppercase tracking-[0.2em] text-foreground-muted font-medium">
              {displayCategory}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6 leading-tight">
            {product.title}
          </h1>
          
          <div className="mb-8 pb-8 border-b border-border/60">
            {product.price ? (
              <span className="text-2xl font-medium tracking-wide text-foreground">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            ) : (
              <span className="text-xl italic text-foreground-muted">
                Price on Request
              </span>
            )}
          </div>

          <div className="prose prose-sm md:prose-base prose-neutral text-foreground-muted mb-10 leading-relaxed max-w-none">
            {product.description ? (
              <p className="whitespace-pre-wrap">{product.description}</p>
            ) : (
              <p className="italic">An exquisite addition to our {displayCategory.toLowerCase()} collection. Please inquire for detailed specifications.</p>
            )}
          </div>

          {/* WhatsApp CTA Button */}
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebd5a] text-white py-5 px-6 font-medium text-sm tracking-[0.1em] uppercase transition-colors duration-300 shadow-sm"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-5 h-5"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Enquire Availability via WhatsApp
          </a>

          <div className="mt-6 flex flex-col gap-3 text-xs text-foreground-muted bg-surface/50 p-6 border border-border/40">
            <div className="flex items-start gap-2">
              <span className="text-gold mt-0.5">•</span>
              <p>Available for exclusive in-store viewing at our Kolkata location.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gold mt-0.5">•</span>
              <p>Prices and availability are subject to change without prior notice.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
