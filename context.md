# Project Context: Gulmohar

## 🎯 Project Goal
Gulmohar is a Next.js hyper-local digital catalog application for a physical retail store. The primary objective is to showcase inventory (Women's Wear, Jewelry, Cosmetics) to local customers. The application does not process online payments or shipping; instead, it funnels users to reserve items via direct WhatsApp inquiries for in-store pickup.

## 🛠️ Tech Stack
- **Framework:** Next.js 16.2.9 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Backend/Database:** Supabase (PostgreSQL, Auth, Storage)
- **Package Manager:** npm

## 📂 Architecture & File Structure
- `app/` - Next.js App Router containing pages, layouts, and API routes.
- `app/(storefront)/` - Public-facing catalog pages.
- `app/(admin)/` - Protected dashboard for inventory management.
- `public/` - Static assets like images and icons.
- `agent/` - Contains guidelines and documentation for LLM agents (e.g., `agent.md`).

## 🔐 Environment Variables Needed
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🔄 Current State & Recent Changes
**[2026-06-18]**
- Project initialized using `create-next-app`.
- Added LLM instructions (`agent/agent.md`) to establish strict behavioral guidelines.
- Created `context.md` to track project progress, architecture, and current state for seamless agent handoffs.
- Set up Supabase Client (`utils/supabase/client.ts`) and completed database schema (`products` table, `product-images` storage bucket, and RLS policies).

## 🚀 Next Steps
1. Scaffold Next.js route groups (`app/(storefront)` and `app/(admin)`).
2. Set up global Tailwind CSS tokens/styles to match the "high-end" brand identity.
3. Build the public storefront homepage layout and navigation.
## 🤖 Instructions for AI Agents
- **Read First:** Always read this `context.md` file and `agent/agent.md` before starting a new task or answering questions.
- **Update Frequently:** When you complete a significant milestone, add a new feature, or change the architecture, **update this file** to reflect the new state.
- **Maintain Clarity:** Keep the "Current State & Recent Changes" chronological and concise. Remove outdated next steps once completed.