# AGENTS.md — Ridham Patel Portfolio

## Stack
- **Framework**: Next.js 15.1.11 (App Router), ISR (`revalidate = 60`) on content pages
- **Package manager**: pnpm (`pnpm dev`, `pnpm build`, `pnpm start`)
- **Styling**: Tailwind CSS 3.4 + custom CSS vars (Nucleo design tokens in `global.css`)
- **DB**: MongoDB Atlas via `@vercel/functions` pool manager (`app/lib/mongodb.ts`)
- **AI Chat**: NVIDIA NIM API (`nvidia/llama-3.1-nemotron-nano-vl-8b-v1`) via `@ai-sdk/openai`
- **Auth**: JWT (jose) + bcryptjs, cookie-based admin session
- **Fonts**: Matter (sans, local), SeasonMix (serif, local)
- **Deploy**: Vercel

## Key Architecture
- **All content lives in MongoDB** (not local files): projects, posts, experience, research, photos, site_config, system_prompts
- **RootLayout is synchronous** — default purple CSS vars injected via `<style>` tag, `ConfigLoader` async component streams DB vars after mount
- **Home page** streams async sections (Experience, Projects, Research) inside `<Suspense>` boundaries
- **Sound system** (`app/lib/sounds.ts` + `app/lib/use-sound.tsx`): global procedural click on every pointer click (always on, no toggle), mechanical keyboard sounds via Cherry MX Black OGG with scancode→offset mapping from keyzen config.json
- **Color theming**: CSS vars driven by `primary-colors.ts`, can be changed via admin dashboard
- **Admin panel** at `/admin` — login, dashboard with seed/CRUD for all content types

## Commands
```bash
pnpm dev        # dev server at localhost:3000
pnpm build      # production build (typecheck via Next.js compiler, no separate tsc step)
pnpm start      # start production server
```

No lint/test scripts in package.json. Build runs Next.js internal typecheck + lint.

## Admin Setup (one-time, first deploy)
1. `POST /api/setup` — creates admin user (`ridhampatel.dev@gmail.com` / `whocares@2004`)
2. Login at `/admin` then go to `/admin/dashboard`
3. Click **Seed Database** — populates projects, posts, experience, research, photos, site_config, system_prompt

## AI Chat
- Chat endpoint: `POST /api/completion` (streaming)
- System prompt stored in MongoDB `system_prompts` collection (`prompt_type: "Ridham_AI_Persona"`)
- To update chatbot's knowledge: re-run Seed Database (updates the MongoDB prompt doc), or edit the prompt content directly in DB
- Uses NVIDIA NIM API key from `NVIDIA_API_KEY` env var
- System prompt is prepended as a user message (NVIDIA API quirk)

## Sound System Constraints
- **Sound must always be on** — no toggle, no off switch. Global `SoundProvider` wraps app in `layout.tsx`
- **Click sound**: procedural Web Audio API (bandpass-filtered noise) in `sounds.click()` — do NOT replace with WAV
- **Keyboard sound**: Cherry MX Black OGG at `/sounds/cherrymx-black-pbt/sound.ogg`, played via scancode→offset map in `app/lib/sounds.ts` — do NOT change the mapping logic
- Command palette wired to `playKeypress(e.code)` on keydown for printable chars

## Important Env Vars
```
MONGODB_URI          # MongoDB Atlas connection string
CLOUDINARY_CLOUD_NAME # for image uploads
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
ADMIN_JWT_SECRET     # JWT signing secret
NVIDIA_API_BASE_URL  # https://integrate.api.nvidia.com/v1
NVIDIA_API_KEY       # NVIDIA NIM API key
```

## Site Config
- Social links & metadata in `app/config.ts` (also overridable via DB site_config)
- Email: `ridhampatel2k4@gmail.com`
- Base URL: `https://ridhfolio.vercel.app`
- Bio on home page is hardcoded in `app/page.tsx` (`IntroSection`) — update there and in seed route

## Notable Files
- `app/lib/collections.ts` — all MongoDB collection getters + TypeScript interfaces
- `app/lib/primary-colors.ts` — color system with 13 preset themes
- `app/lib/admin-auth.ts` — JWT + bcrypt auth helpers
- `app/lib/sounds.ts` — procedural click synth + keyboard OGG playback
- `app/lib/use-sound.tsx` — `SoundProvider` component, `playClick()`, `playKeypress()` exports
- `app/api/admin/seed/route.ts` — full DB seeder (content + admin + system prompt)
- `app/api/completion/route.ts` — AI streaming chat endpoint

## Blog Posts
- Content stored in MongoDB `posts` collection (raw MDX strings)
- Rendered via `next-mdx-remote` in blog pages
- `/content` directory is **not** used — all content comes from DB
