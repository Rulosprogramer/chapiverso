# Chapiverso — Agent Guide

## Stack
- **Next.js 16.2.6** (App Router) + **React 19.2.4** + **TypeScript 5**
- **Tailwind CSS v4** (PostCSS via `@tailwindcss/postcss`; theme tokens in `globals.css` `@theme`, no `tailwind.config`)
- **Neon PostgreSQL** via `@neondatabase/serverless`
- **ESLint** with `eslint-config-next/core-web-vitals` config
- Deployed on **Vercel** at `chapiverso.vercel.app`

## Setup
1. `npm install`
2. Copy `.env.local` — needs `DATABASE_URL` (Neon) and `ADMIN_PASSWORD`
3. `npm run dev` → `http://localhost:3000`
4. **One-time DB setup:** `POST /api/setup` creates the `activities` table and seeds it from `src/data/activities.json`

## Key Commands
| Command | Action |
|---------|--------|
| `npm run dev` | Dev server (TurboPack) |
| `npm run build` | Production build |
| `npm run lint` | ESLint (only check, no fix) |

No test runner, no typecheck script configured.

## Architecture
- **Single-page site** (`src/app/page.tsx`) with `export const dynamic = "force-dynamic"` — reads DB on every request
- **Fonts:** Anton (display, `--font-anton`), Barlow (sans, `--font-barlow`) via `next/font/google`
- **Custom theme colors:** `chapi-blue`, `chapi-orange`, `chapi-yellow`, `chapi-cream`, `chapi-magenta`, `chapi-dark`, `chapi-dark-2` (defined in `globals.css`)
- **Admin panel** at `/admin` — client component, cookie-based auth (`chapiverso_admin`), CRUD for activities

## API Routes
| Route | Method | Auth? |
|-------|--------|-------|
| `/api/activities` | GET (public), POST (admin) | POST requires cookie |
| `/api/activities/[id]` | PUT, DELETE | Requires cookie |
| `/api/auth` | POST (login), DELETE (logout) | — |
| `/api/auth/verify` | GET | Checks cookie |
| `/api/setup` | POST | No auth (one-time) |

## DB Schema
Single table `activities` created by hitting `POST /api/setup`. Columns: `id TEXT PK`, `title`, `date`, `time`, `end_time`, `location`, `category`, `description`, `featured BOOLEAN`, `created_at TIMESTAMPTZ`.

## Quirks & Gotchas
- `params` in route handlers is `Promise<{ id: string }>` — must be `await`ed (Next.js 16 convention)
- Admin password lives in `.env.local` as `ADMIN_PASSWORD`
- `.gitignore` excludes `.env*`, `.next/`, `.claude/`
- No test infrastructure, no CI config
- ESLint config uses flat config (`eslint.config.mjs`) with `globalIgnores` for `.next/`, `out/`, `build/`
- Site is entirely in Spanish

## Limitations (noted for future)
- No typecheck npm script; run `npx tsc --noEmit` if needed
- No migration tooling; DB schema changes are manual SQL
