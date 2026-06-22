const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

const ALLOWED_BUCKET = "product-images";
const ALLOWED_PATH = new RegExp(
  `^/storage/v1/(object/public|render/image/public)/${ALLOWED_BUCKET}/[^?#]+$`,
);

export function isAllowedImageUrl(url: string | null | undefined): url is string {
  if (!url || typeof url !== "string") return false;
  if (url.length === 0) return false;
  if (!SUPABASE_URL) return false;
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.protocol !== "https:") return false;
  if (parsed.origin !== SUPABASE_URL) return false;
  if (!ALLOWED_PATH.test(parsed.pathname)) return false;
  const decoded = (() => {
    try {
      return decodeURIComponent(parsed.pathname);
    } catch {
      return parsed.pathname;
    }
  })();
  if (/[\x00-\x1f\x7f]/.test(decoded)) return false;
  return true;
}

export function safeImageSrc(url: string | null | undefined): string | null {
  return isAllowedImageUrl(url) ? url : null;
}

export function getValidImageUrls(
  urls: readonly unknown[] | null | undefined,
): string[] {
  if (!Array.isArray(urls)) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const candidate of urls) {
    if (isAllowedImageUrl(candidate) && !seen.has(candidate)) {
      seen.add(candidate);
      out.push(candidate);
    }
  }
  return out;
}