"use client";

interface SupabaseLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

const MAX_WIDTH = 4096;
const MIN_QUALITY = 1;
const MAX_QUALITY = 100;

function clampInt(n: unknown, min: number, max: number): number | null {
  const num = Number(n);
  if (!Number.isFinite(num) || num <= 0) return null;
  return Math.min(Math.max(Math.round(num), min), max);
}

export default function supabaseLoader({
  src,
  width,
  quality,
}: SupabaseLoaderProps) {
  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return src;
  }

  if (!url.pathname.startsWith("/storage/v1/")) return src;

  const renderPath = url.pathname.includes("/object/public/")
    ? url.pathname.replace("/object/public/", "/render/image/public/")
    : url.pathname;

  const w = clampInt(width, 1, MAX_WIDTH);
  if (w === null) return src;

  const params = new URLSearchParams(url.searchParams);
  params.set("width", w.toString());
  params.set("resize", "contain");
  params.set("format", "webp");
  if (quality !== undefined) {
    const q = clampInt(quality, MIN_QUALITY, MAX_QUALITY);
    if (q !== null) params.set("quality", q.toString());
  }

  return `${url.origin}${renderPath}?${params.toString()}`;
}