# Copilot / AI Agent Hints for contribs 🚀

Keep this short and actionable — things that help an AI coding agent be productive in this repository.

## Quick summary
- Next.js 16 (App Router) + TypeScript + Tailwind. React 19. Code is automatically synced with v0.app and deployed to Vercel (see `README.md`).

## How to run (local) ⚙️
- Install and run dev server:
  - npm install
  - npm run dev
- Build/test/lint:
  - npm run build
  - npm run start
  - npm run lint

## High level architecture & where to look 🔎
- app/ — Next.js App Router routes (server & client components). Notable area: `app/admin` (dashboard, upload, edit routes).
- components/ — Reusable UI components. **`components/ui/`** contains primitives used across the app (Buttons, Inputs, Selects, etc.). Prefer using these primitives for consistent styling.
- lib/ — small helpers and integrations:
  - `lib/supabase.ts` — createClient; **requires env vars** (see below).
  - `lib/storage-utils.ts` — helper `uploadCosplayImage` used to upload to Supabase Storage.
- styles/ — global styles and Tailwind customizations; many custom classes (e.g. `glass-card`, `neon-border-subtle`) are defined in `styles/globals.css`.
- public/ — static assets and placeholders.

## Important patterns & conventions ✅
- Client vs Server components: files with a top-line `"use client"` are client components (e.g. `components/cosplay-form.tsx`). Agents should preserve the client/server boundary and move logic accordingly.
- Upload flow: previews done in client (`URL.createObjectURL`), then uploads performed by the Supabase client (see `lib/storage-utils.ts` and `app/admin/admin-upload.ts`).
- UI composition: use `components/ui/*` primitives rather than ad-hoc HTML to preserve themes and Tailwind variants.
- Spanish copy: UI strings are in Spanish. Keep language/context consistent when adding UI text.

## Integration points & env vars (critical) 🔑
- Supabase client uses public keys from env:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- Supabase storage bucket expected: `cosplay-media` (used in `storage-utils.ts` and `app/admin/admin-upload.ts`). Ensure this bucket exists and has appropriate public settings if public links are expected.
- Deploy: Vercel + automatic sync from v0.app — edits made on v0.app may overwrite repo changes. Check `README.md` before making persistent structural changes.

## Notable config & gotchas ⚠️
- `next.config.mjs` has `typescript.ignoreBuildErrors: true`. Type errors might not block local builds but still consider fixing them before major changes.
- `images.unoptimized: true` — images are not optimized via Next.js image loader; image behavior may differ in production.
- There are no automated tests in the repo. Use `npm run lint` to catch obvious issues.

## Quick examples (copyable snippets) 💡
- Upload helper (see `lib/storage-utils.ts`):

```ts
// upload a File and get a public URL
import { uploadCosplayImage } from '@/lib/storage-utils'
const publicUrl = await uploadCosplayImage(file)
```

- Supabase client creation (see `lib/supabase.ts`):

```ts
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!)
```

## What agents should do before making changes ✍️
- Verify environment variables are set locally (or in Vercel previews) before testing integration with Supabase.
- If adding storage/schema changes (buckets, tables), include migration steps and verify they exist in Supabase (bucket name `cosplay-media`).
- Preserve `use client` annotations and UI primitives to avoid breaking hydration and styling.
- Confirm whether v0.app auto-sync will overwrite your change — for changes that must persist, coordinate with the v0.app configuration or owner.

---

If anything important is missing or you want this tuned for a specific workflow (CI, tests, or deployment steps), tell me what to add and I'll update this file.