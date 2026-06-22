"use client";

import Link from "next/link";
import { STORE_CONFIG } from "@/config/store";
import FloatingNav from "@/components/ui/floating-nav";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Women's Wear", href: "/catalog?category=womens-wear" },
  { name: "Jewelry", href: "/catalog?category=jewelry" },
  { name: "Cosmetics", href: "/catalog?category=cosmetics" },
  { name: "Contact Us", href: "/contact" },
];

export function Navbar() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-background)]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">
            <Link
              href="/"
              className="font-serif text-3xl tracking-tight text-[var(--color-foreground)] hover:text-[var(--color-gold)] transition-colors"
            >
              {STORE_CONFIG.name}
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--color-foreground-muted)]">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="hover:text-[var(--color-foreground)] transition-colors duration-200"
                >
                  {l.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <div className="md:hidden">
        <FloatingNav />
      </div>
    </>
  );
}