"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/utils/supabase/client";
import { safeImageSrc } from "@/lib/images";

// Define the expected Product shape
interface Product {
  id: string;
  title: string;
  category: string;
  price: number | null;
  image_urls: string[];
}

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("womens-wear");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      // 1. Backend safety guard: check for active session
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      
      if (authError || !session) {
        router.push("/admin/login");
        return;
      }

      // 2. Fetch inventory ledger
      fetchProducts();
    };

    checkAuthAndFetch();
  }, [router]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setIsLoading(false);
  };

  const handleDelete = async (productId: string) => {
    if (!window.confirm("Are you sure you want to completely remove this product?")) return;
    
    setIsDeleting(productId);
    
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (!error) {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } else {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product. Please try again.");
    }
    
    setIsDeleting(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !file) {
      alert("Please provide Title, Category, and an Image.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload image to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `public/${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // 2. Retrieve the public URL
      const { data: publicUrlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(uploadData.path);

      // 3. Insert into the products table
      const parsedPrice = price ? parseFloat(price) : null;
      
      const { error: insertError } = await supabase
        .from('products')
        .insert({
          title,
          description: description || null,
          price: parsedPrice,
          category,
          image_urls: [publicUrlData.publicUrl]
        });

      if (insertError) {
        throw new Error(`Insert failed: ${insertError.message}`);
      }

      // 4. Reset form and refresh list
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("womens-wear");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setIsModalOpen(false);
      
      fetchProducts(); // Refresh list to show new item instantly

    } catch (err: any) {
      console.error(err);
      alert(err.message || "An error occurred during ingestion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center text-foreground-muted tracking-widest uppercase text-sm">
        <div className="w-4 h-4 border-2 border-foreground border-t-transparent rounded-full animate-spin mb-4" />
        Loading Ledger...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-serif text-foreground mb-2">Inventory Ledger</h1>
            <p className="text-foreground-muted text-sm">Manage your catalog items across all collections.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center px-6 py-4 bg-foreground text-background text-xs uppercase tracking-[0.15em] font-medium hover:bg-gold hover:text-foreground transition-colors shadow-sm"
          >
            + Add New Product
          </button>
        </header>

        <div className="bg-background border border-border shadow-sm overflow-hidden relative">
          {products.length === 0 ? (
            <div className="p-16 text-center">
              <h3 className="font-serif text-xl mb-2 text-foreground">Your catalog is empty</h3>
              <p className="text-foreground-muted text-sm mb-6 max-w-sm mx-auto">Click the button above to ingest your first piece of inventory into the system.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface/40 text-xs uppercase tracking-widest text-foreground-muted">
                    <th className="p-5 font-medium w-24">Image</th>
                    <th className="p-5 font-medium">Title</th>
                    <th className="p-5 font-medium">Category</th>
                    <th className="p-5 font-medium">Price</th>
                    <th className="p-5 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-surface/30 transition-colors">
                      <td className="p-5">
                        <div className="relative w-12 h-16 bg-surface border border-border overflow-hidden">
                          {(() => {
                            const src = safeImageSrc(product.image_urls?.[0]);
                            return src ? (
                              <Image
                                src={src}
                                alt={product.title}
                                fill
                                className="object-cover"
                                sizes="48px"
                                unoptimized
                              />
                            ) : (
                              <span className="absolute inset-0 flex items-center justify-center text-[9px] text-foreground-muted uppercase tracking-wider text-center p-1">No Img</span>
                            );
                          })()}
                        </div>
                      </td>
                      <td className="p-5 font-serif text-base text-foreground font-medium">
                        {product.title}
                      </td>
                      <td className="p-5">
                        <span className="px-2.5 py-1.5 bg-surface border border-border text-[10px] uppercase tracking-widest text-foreground-muted whitespace-nowrap">
                          {product.category}
                        </span>
                      </td>
                      <td className="p-5 text-foreground">
                        {product.price ? `₹${product.price.toLocaleString('en-IN')}` : <span className="text-foreground-muted italic text-xs uppercase tracking-widest">On Request</span>}
                      </td>
                      <td className="p-5 text-right">
                        <button 
                          onClick={() => handleDelete(product.id)}
                          disabled={isDeleting === product.id}
                          className="inline-flex items-center justify-center w-9 h-9 rounded hover:bg-red-50 hover:text-red-600 text-foreground-muted transition-colors disabled:opacity-50"
                          title="Delete Product"
                        >
                          {isDeleting === product.id ? (
                            <div className="w-3 h-3 border border-red-600 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-background border border-border w-full max-w-xl shadow-xl max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-2xl font-serif text-foreground">Ingest Product</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-foreground-muted hover:text-foreground p-2"
                disabled={isSubmitting}
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="ingest-form" onSubmit={handleSubmit} className="space-y-5">
                
                {/* Title */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-[0.1em] text-foreground-muted mb-2">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-surface border border-border focus:border-foreground focus:outline-none transition-colors text-foreground"
                    placeholder="e.g., Emerald Drop Earrings"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Category & Price Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-[0.1em] text-foreground-muted mb-2">Category *</label>
                    <select
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-surface border border-border focus:border-foreground focus:outline-none transition-colors text-foreground appearance-none"
                      disabled={isSubmitting}
                    >
                      <option value="womens-wear">Women's Wear</option>
                      <option value="jewelry">Jewelry</option>
                      <option value="cosmetics">Cosmetics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-[0.1em] text-foreground-muted mb-2">Price (INR)</label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-4 py-3 bg-surface border border-border focus:border-foreground focus:outline-none transition-colors text-foreground"
                      placeholder="Leave blank for 'On Request'"
                      min="0"
                      step="0.01"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-[0.1em] text-foreground-muted mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 bg-surface border border-border focus:border-foreground focus:outline-none transition-colors text-foreground min-h-[100px] resize-y"
                    placeholder="Describe the material, fit, or details..."
                    disabled={isSubmitting}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-[0.1em] text-foreground-muted mb-2">Image File *</label>
                  <input
                    type="file"
                    required
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    ref={fileInputRef}
                    className="w-full text-sm text-foreground-muted file:mr-4 file:py-2.5 file:px-4 file:border-0 file:bg-foreground file:text-background file:text-xs file:uppercase file:tracking-widest file:font-medium hover:file:bg-gold hover:file:text-foreground file:cursor-pointer file:transition-colors bg-surface border border-border p-1"
                    disabled={isSubmitting}
                  />
                </div>

              </form>
            </div>

            <div className="p-6 border-t border-border bg-surface/50 flex justify-end">
              <button
                type="submit"
                form="ingest-form"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center px-8 py-3 bg-foreground text-background text-xs uppercase tracking-[0.15em] font-medium hover:bg-gold hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                    Ingesting...
                  </>
                ) : (
                  "Save & Publish"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
