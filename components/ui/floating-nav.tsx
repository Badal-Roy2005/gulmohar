"use client";

import React, { useState, useRef, useEffect, forwardRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  ShoppingBag,
  Mail,
  type LucideIcon,
} from "lucide-react";

export type FloatingNavItem = {
  id: string | number;
  href: string;
  icon: LucideIcon;
  label: string;
};

type FloatingNavProps = {
  items?: FloatingNavItem[];
};

const defaultItems: FloatingNavItem[] = [
  { id: "home", href: "/", icon: Home, label: "Home" },
  { id: "catalog", href: "/catalog", icon: ShoppingBag, label: "Catalog" },
  { id: "contact", href: "/contact", icon: Mail, label: "Contact" },
];

const resolveActiveIndex = (items: FloatingNavItem[], pathname: string) => {
  const here = pathname || "/";
  const exact = items.findIndex((it) => it.href === here);
  if (exact !== -1) return exact;
  const prefix = items.findIndex(
    (it) => it.href !== "/" && here.startsWith(it.href + "/"),
  );
  if (prefix !== -1) return prefix;
  const homeIdx = items.findIndex((it) => it.href === "/");
  return homeIdx === -1 ? 0 : homeIdx;
};

const FloatingNav = forwardRef<HTMLDivElement, FloatingNavProps>(
  function FloatingNav({ items = defaultItems }, _ref) {
    const [active, setActive] = useState(0);
    const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const btnRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    const pathname = usePathname() ?? "/";
    const activeIndex = resolveActiveIndex(items, pathname);
    const effectiveActive = activeIndex !== -1 ? activeIndex : active;

    useEffect(() => {
      const update = () => {
        const btn = btnRefs.current[effectiveActive];
        const container = containerRef.current;
        if (!btn || !container) return;
        const btnRect = btn.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        setIndicatorStyle({
          width: btnRect.width,
          left: btnRect.left - containerRect.left,
        });
      };
      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }, [effectiveActive, pathname]);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
    }, []);

    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
        <div
          ref={containerRef}
          className="relative flex items-center justify-between rounded-full px-1.5 py-2 border border-[var(--color-border)] bg-[var(--color-background)]/95 shadow-2xl backdrop-blur-md"
        >
          {items.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === effectiveActive;
            return (
              <Link
                key={item.id}
                href={item.href}
                ref={(el) => {
                  btnRefs.current[index] = el;
                }}
                onClick={() => setActive(index)}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex flex-col items-center justify-center flex-1 px-2 py-2 text-sm font-medium rounded-full transition-colors duration-300 ease-out ${
                  isActive
                    ? "text-[var(--color-gold)]"
                    : "text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] active:scale-95"
                }`}
                style={{ minHeight: 44, touchAction: "manipulation" }}
              >
                <div className="z-10">
                  <Icon size={20} strokeWidth={isActive ? 2.25 : 2} />
                </div>
                <span className="text-[10px] mt-0.5 font-medium uppercase tracking-wider">
                  {item.label === "Contact" ? "Contact" : item.label}
                </span>
              </Link>
            );
          })}

          <motion.div
            animate={indicatorStyle}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className="absolute top-1 bottom-1 rounded-full bg-[var(--color-gold)]/15 border border-[var(--color-gold)]/40 pointer-events-none"
            style={{ opacity: mounted && indicatorStyle.width > 0 ? 1 : 0 }}
          />
        </div>
      </div>
    );
  },
);

export default FloatingNav;
