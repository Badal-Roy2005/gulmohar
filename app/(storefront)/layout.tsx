import Link from 'next/link';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="font-serif text-3xl tracking-tight text-foreground">
          Gulmohar
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground-muted">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <Link href="/catalog?category=womens-wear" className="hover:text-foreground transition-colors">Women's Wear</Link>
          <Link href="/catalog?category=jewelry" className="hover:text-foreground transition-colors">Jewelry</Link>
          <Link href="/catalog?category=cosmetics" className="hover:text-foreground transition-colors">Cosmetics</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-surface py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-serif text-2xl mb-4 text-foreground">Gulmohar</h3>
          <p className="text-sm text-foreground-muted max-w-sm leading-relaxed">
            Elevating your everyday style with curated collections of women's wear, fine jewelry, and luxury cosmetics.
          </p>
        </div>
        <div>
          <h4 className="font-medium text-lg mb-4 text-foreground tracking-tight">Visit Us</h4>
          <address className="text-sm text-foreground-muted not-italic flex flex-col gap-2">
            <span>Shop No 7, Greenvista</span>
            <span>Narayanpur, Battala, R-Gopalpur</span>
            <span>Kolkata, North 24 Parganas</span>
            <span className="mt-2 text-foreground font-medium">Phone: +91 89107 40057</span>
          </address>
        </div>
        <div>
          <h4 className="font-medium text-lg mb-4 text-foreground tracking-tight">Store Hours</h4>
          <ul className="text-sm text-foreground-muted flex flex-col gap-2">
            <li className="font-medium text-foreground mb-1">Open All 7 Days</li>
            <li>10:00 AM - 2:00 PM</li>
            <li>5:00 PM - 10:00 PM</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-border/60 text-sm text-foreground-muted flex flex-col md:flex-row items-center justify-between">
        <p>© {new Date().getFullYear()} Gulmohar Boutique. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed for local elegance.</p>
      </div>
    </footer>
  );
}
