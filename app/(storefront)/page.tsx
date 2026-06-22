import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative px-4 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:px-8 text-center flex flex-col items-center justify-center overflow-hidden min-h-[90svh]">
        {/* Background Video — object-cover fills the container on all screen sizes */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover object-center -z-20"
        >
          <source src="/videos/background_video/background.mp4" type="video/mp4" />
        </video>
        
        {/* Light scrim: just enough to make text pop without hiding the video */}
        <div className="absolute inset-0 bg-black/30 -z-10" />
        {/* Bottom gradient to ground the CTA button on mobile */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent -z-10" />
        
        <h1 className="text-5xl md:text-7xl font-serif text-white max-w-4xl mx-auto tracking-tight leading-tight mb-8">
          Premium Women's Wear, Fine Jewelry, and Cosmetics
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Discover a curated collection of local elegance. Hand-picked luxury fashion and beauty essentials available exclusively at our Kolkata boutique.
        </p>
        
        {/* Framed Container around the CTA for absolute clarity and elegance */}
        <div className="p-2 border border-white/20 rounded-md backdrop-blur-xs bg-black/10">
          <Link 
            href="/catalog" 
            className="inline-flex items-center justify-center px-8 py-4 bg-[var(--color-foreground)] text-[var(--color-background)] font-medium text-sm tracking-wide uppercase hover:bg-[var(--color-gold)] hover:text-[var(--color-foreground)] transition-colors duration-300 shadow-xl"
          >
            View The Catalog
          </Link>
        </div>
      </section>

      {/* The Three Pillars Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-foreground)] mb-4">Our Collections</h2>
          <p className="text-[var(--color-foreground-muted)]">Explore the three pillars of Gulmohar's aesthetic.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: Women's Wear */}
          <Link href="/catalog?category=womens-wear" className="group relative block aspect-[4/5] overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all duration-500">
            {/* Background Image */}
            <Image
              src="/photos/women_ware/dress3.jpeg"
              alt="Women's Wear Collection"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {/* Dark gradient scrim — stronger at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
            {/* Text overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center z-20">
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-white/70 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">Discover</span>
              <h3 className="text-3xl font-serif text-white">Women's Wear</h3>
            </div>
          </Link>

          {/* Pillar 2: Jewelry */}
          <Link href="/catalog?category=jewelry" className="group relative block aspect-[4/5] overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all duration-500">
            {/* Background Image */}
            <Image
              src="/photos/Jwellery/jwel_background.jpeg"
              alt="Fine Jewelry Collection"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
            <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center z-20">
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-white/70 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">Discover</span>
              <h3 className="text-3xl font-serif text-white">Fine Jewelry</h3>
            </div>
          </Link>

          {/* Pillar 3: Cosmetics */}
          <Link href="/catalog?category=cosmetics" className="group relative block aspect-[4/5] overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all duration-500">
            {/* Background Image */}
            <Image
              src="/photos/Cosmetic/cosmetic.avif"
              alt="Premium Cosmetics Collection"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
            <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center z-20">
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-white/70 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">Discover</span>
              <h3 className="text-3xl font-serif text-white">Premium Cosmetics</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* Workflow Informational Section */}
      <section className="py-24 bg-[var(--color-foreground)] text-[var(--color-background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-[var(--color-background)]/20 flex items-center justify-center text-2xl font-serif mb-6 text-[var(--color-gold)]">1</div>
              <h3 className="text-xl font-medium mb-3">Browse Online</h3>
              <p className="text-[var(--color-background)]/70 leading-relaxed max-w-sm">
                Explore our carefully curated digital catalog to discover the latest arrivals and timeless classics from the comfort of your home.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-[var(--color-background)]/20 flex items-center justify-center text-2xl font-serif mb-6 text-[var(--color-gold)]">2</div>
              <h3 className="text-xl font-medium mb-3">Inquire via WhatsApp</h3>
              <p className="text-[var(--color-background)]/70 leading-relaxed max-w-sm">
                See something you love? Tap the WhatsApp button to connect directly with our boutique manager and confirm stock availability.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-[var(--color-background)]/20 flex items-center justify-center text-2xl font-serif mb-6 text-[var(--color-gold)]">3</div>
              <h3 className="text-xl font-medium mb-3">Try On In-Store</h3>
              <p className="text-[var(--color-background)]/70 leading-relaxed max-w-sm">
                Visit our boutique to experience the premium quality firsthand. Reserve your favorites and purchase directly at the counter.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Hyper-Local Map Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/3">
          <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-foreground)] mb-6">Visit Gulmohar</h2>
          <p className="text-[var(--color-foreground-muted)] leading-relaxed mb-6">
            Located in Kolkata, Gulmohar offers an unparalleled shopping experience for women's luxury apparel, artisanal jewelry, and branded cosmetics.
          </p>
          <address className="not-italic text-sm text-[var(--color-foreground)] space-y-2 mb-8">
            <p className="font-medium text-base">Gulmohar Boutique</p>
            <p>Shop No 7, Greenvista, Narayanpur</p>
            <p>Battala, R-Gopalpur</p>
            <p>Kolkata, North 24 Parganas</p>
          </address>
          <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-[var(--color-gold)] hover:text-[var(--color-foreground)] transition-colors">
            Get Directions <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        
        <div className="w-full md:w-2/3 aspect-video md:aspect-[21/9] bg-[var(--color-surface)] relative overflow-hidden border border-[var(--color-border)] p-1">
          {/* Clean Placeholder Map Embed */}
          <div className="w-full h-full relative bg-[var(--color-foreground)]/5">
            <iframe 
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=GREENVISTA,%20NARAYANPUR,%20BATTALA,%20R-GOPALPUR,%20KOLKATA+(Gulmohar%20Boutique)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 filter grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </section>

    </div>
  );
}