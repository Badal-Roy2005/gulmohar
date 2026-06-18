"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setIsLoading(false);
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md p-8 md:p-12 bg-background border border-border shadow-sm">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-foreground mb-2">Gulmohar Admin</h1>
          <p className="text-sm text-foreground-muted">Sign in to manage your inventory.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-medium uppercase tracking-[0.1em] text-foreground-muted mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-border focus:border-foreground focus:outline-none transition-colors text-foreground"
              placeholder="manager@gulmohar.com"
            />
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-[0.1em] text-foreground-muted mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-border focus:border-foreground focus:outline-none transition-colors text-foreground"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50/50 border border-red-200 text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-foreground text-background py-4 text-sm font-medium uppercase tracking-[0.15em] hover:bg-gold hover:text-foreground transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
