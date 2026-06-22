"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { STORE_CONFIG } from "@/config/store";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Women's Wear", href: "/catalog?category=womens-wear" },
  { name: "Jewelry", href: "/catalog?category=jewelry" },
  { name: "Cosmetics", href: "/catalog?category=cosmetics" },
  { name: "Contact Us", href: "/contact" },
];

function NavIcon({ name, active }: { name: string; active: boolean }) {
  const cls = `w-5 h-5 pointer-events-none ${active ? "text-[var(--color-gold)]" : "text-[var(--color-foreground-muted)]"}`;
  switch (name) {
    case "Home":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      );
    case "Women's Wear":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      );
    case "Jewelry":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M6 3h12l4 6-10 13L2 9z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/>
        </svg>
      );
    case "Cosmetics":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M6 2h12v4H6z"/><path d="M7 6h10v15a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z"/><path d="M9 11h6"/>
        </svg>
      );
    case "Contact Us":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={cls}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      );
    default:
      return null;
  }
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  const [path] = href.split("?");
  return pathname === path || pathname.startsWith(path + "/");
}

export function Navbar() {
  const pathname = usePathname() ?? "/";

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

      <nav
        aria-label="Mobile navigation"
        className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md rounded-full border border-[var(--color-border)] bg-[var(--color-background)]/95 shadow-2xl backdrop-blur-md"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <ul className="flex items-center justify-between px-2 py-2">
          {navLinks.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-1.5 rounded-full transition-colors ${
                    active
                      ? "text-[var(--color-gold)]"
                      : "text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)]"
                  }`}
                  style={{ minHeight: 44, touchAction: "manipulation" }}
                >
                  <NavIcon name={l.name} active={active} />
                  <span className="text-[10px] font-medium uppercase tracking-wider">
                    {l.name === "Women's Wear" ? "Wear" : l.name === "Contact Us" ? "Contact" : l.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}