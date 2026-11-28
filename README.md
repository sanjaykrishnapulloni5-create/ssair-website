# Sri Srinivasa AI Robotics (SSAIR) Platform

Official deep-tech showcase, R&D catalog, and Student & Teaching Portal for **Sri Srinivasa AI Robotics Pvt. Ltd.** (`CIN: U72100KA2026PTC222434`, sister company of Sri Saraswathi Artificial Intelligence and Robotics Pvt. Ltd.).

Engineered for zero-WASM edge execution on **Cloudflare Workers + Cloudflare D1** via `vinext`, with full local parity in Node.js (`node:sqlite` + Next.js).

## Architecture Overview

- **Cloudflare Runtime (`vinext` + `@cloudflare/vite-plugin`)**: App Router RSC, SSR, Route Handlers, Workers Cache API (`@vinext/cloudflare`), and Workers Static Assets configured in `vite.config.ts` and `cloudflare.config.ts`.
- **Dual Database Engine (`src/lib/db.ts`)**:
  - **Cloudflare Workers**: Native Cloudflare D1 binding (`env.DB` via `cloudflare:workers`) with parameterized SQL prepared statements and auto-bootstrap safety (`ensureSchemaAndSeed`).
  - **Local Node.js Fallback**: Built-in `node:sqlite` (`prisma/dev.db`) when running Next.js directly on Node 24+.
  - **Migrations**: Versioned SQL schema & seed scripts under `migrations/0001_init.sql` and `migrations/0002_seed.sql` derived from `prisma/schema.prisma`.
- **Edge-Native Web Crypto Security (`src/lib/auth.ts`)**:
  - Hardware-accelerated PBKDF2-SHA256 (`100,000` iterations, CSPRNG salts, constant-time verify).
  - Native Web Crypto HS256 JWT (`crypto.subtle`) + database-backed sessions (`Session` table).
  - Protocol-aware `HttpOnly`, `SameSite=Lax` cookies (`Secure` enforced over HTTPS).

## Local Development

```bash
# Install dependencies
npm install

# Generate Cloudflare Worker binding types (.cloudflare/types)
npx cf workers types

# Run Cloudflare Workers local runtime (workerd + local D1) on port 3001
npm run dev:vinext

# Or run standard Next.js dev server (Node 24+ built-in sqlite) on port 3000
npm run dev
```

Demo student account pre-seeded in both local D1 and `prisma/dev.db`:
- **Email:** `test@ssair.in`
- **Password:** `test123`

## Production Verification & Builds

```bash
# 1. Regenerate binding types & typecheck
npx cf workers types
npx tsc --noEmit

# 2. Lint check
npm run lint

# 3. Build Cloudflare Worker bundle
npm run build:vinext

# 4. Preview built Cloudflare Worker locally (workerd + Miniflare D1)
npm run start:vinext
```

## Deploying to Cloudflare Workers & D1

1. **Authenticate with Cloudflare:**
   ```bash
   npx cf auth login
   ```
2. **Build and deploy the Worker (auto-provisions `ssair-db` D1 & assets):**
   ```bash
   npm run deploy:vinext
   ```
   *(If `cf deploy` outputs a provisioned D1 database ID, record it in `cloudflare.config.ts` under `bindings.d1({ name: "ssair-db", id: "<D1_DATABASE_ID>" })` for future deploys.)*
3. **Apply versioned D1 SQL migrations remotely (optional — runtime also auto-bootstraps schema on first request):**
   ```bash
   npx cf d1 migrations apply <D1_DATABASE_ID> --remote
   ```
4. **Set production `JWT_SECRET` (recommended for signing auth tokens):**
   ```bash
   npx wrangler secret put JWT_SECRET --name ssair-website
   ```
5. **Verify deployment health:**
   Visit `https://<your-worker-url>/api/health` to confirm `runtime: "cloudflare-workers"`, `database.engine: "cloudflare-d1"`, `webCryptoAvailable: true`, and `jwtSecretConfigured: true`.

## Key Backend Endpoints

- `GET /api/health` — Database engine, row counts, and crypto readiness check
- `POST /api/auth/register` · `POST /api/auth/login` · `POST /api/auth/logout`
- `GET /api/auth/session` · `PATCH /api/auth/profile`
- `GET / POST / PATCH / DELETE /api/teaching-application`
- `GET / POST / DELETE /api/project-request`
- `GET / POST /api/contact`
- `GET /api/services` · `GET /api/projects` · `GET /api/research`
