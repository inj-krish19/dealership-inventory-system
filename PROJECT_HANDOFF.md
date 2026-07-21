# AutoLot — Project Handoff Context

> Paste this entire file as the first message in a new chat/account if
> continuity is lost. It captures full project state as of assessment
> submission, so development (e.g. live changes during a technical
> interview) can resume without re-explaining anything.

## Status: Assessment submitted. This file is for continuity into interview-stage changes.

---

## 1. What this project is

Placement kata: full-stack Car Dealership Inventory System ("AutoLot").
evaluates for real engineering craft — TDD commit history, SOLID
architecture, transparent AI usage — not just a working demo.

## 2. Links

- Repo: https://github.com/inj-krish19/dealership-inventory-system
- Live App: https://dealership-inventory-system.vercel.app/
- Live API: (check README — verify this is actually a distinct URL from the app link before relying on it)
- Backend API docs: `/docs` (HTML table) and `/docs/json` on the live API URL

## 3. Demo credentials (seeded on live DB — verify still valid)

| Role  | Email           | Password     |
| ----- | --------------- | ------------ |
| User  | user@gmail.com  | Pass@123     |
| Admin | admin@gmail.com | ADM1N@5ECURE |

Two more seeded per SAMPLE_DATA.md: `kglivee19@gmail.com` (user),
`krishshah19.in@gmail.com` (admin) — same passwords as above per role.

Admin role is **not self-serve** — set manually via Atlas `users` collection,
`role` field. This is intentional (see spec's "(Admin only)" markers).

## 4. Tech stack (final, decided)

**Backend:** Node.js + Express + TypeScript (ESM, `"type": "module"`),
MongoDB Atlas + Mongoose, JWT (jsonwebtoken) + bcryptjs, Zod validation,
Jest + Supertest (testing), tsx (dev runner).

**Frontend:** React + Vite + TypeScript, Tailwind CSS **v4** (CSS-first
config, no `tailwind.config.js`), Zustand (state), React Router, Framer
Motion (animation), Axios, React Icons, Vitest + React Testing Library.

**Chose TS over NestJS** to leverage existing MERN experience under time
pressure. **Chose Atlas over local Mongo** for zero local setup + easy
deployment story.

## 5. Architecture

3-layer backend: **Controller** (thin, HTTP only) → **Service** (business
logic) → **Repository** (interface + Mongo implementation). Services depend
on repository _interfaces_, not Mongoose directly — this is the Dependency
Inversion application, and it's what makes `AuthService`/`VehicleService`
unit-testable with fake in-memory repositories (no DB needed for those tests).

Folder structure mirrors this: `src/{config,models,repositories/{interfaces,mongo},services,controllers,routes,middleware,validators,utils}`.
Tests live in a **top-level `tests/` directory** on both frontend and
backend (never colocated in `src/`) — `tests/unit/` and `tests/integration/`
(backend), `tests/unit/` and `tests/pages/` (frontend).

## 6. Data model note — important gotcha

`Vehicle.modelName` (NOT `model`) internally — `model` collides with
Mongoose's `Document.model()` method, causing a TS compile error if used as
a field name. The public API contract still uses `model` (per spec) — a DTO
mapper (`src/utils/vehicleMapper.ts`, `toVehicleDTO`/`fromVehicleRequestBody`)
bridges the two at the controller boundary. If touching Vehicle-related code,
remember this split.

## 7. Auth & roles

- JWT-based, `role: 'user' | 'admin'` enum on User model (not a boolean).
- Same login/register flow for everyone — **no separate admin login page**.
  Role comes back in the JWT/user object; Navbar conditionally shows "Admin
  Panel" link, and `/admin` route is wrapped in an `AdminRoute` guard
  (redirects non-admins to `/dashboard`).
- `DELETE /api/vehicles/:id` and `POST /api/vehicles/:id/restock` are
  admin-only server-side (`requireAdmin` middleware) — this is enforced in
  the backend, not just hidden in UI. Confirmed via integration tests
  (403 for non-admin, 200 for admin) and manual Postman testing.
- Regular users do **NOT** have create/update vehicle privileges — this was
  explicitly reverted after a mid-project detour; only Admin Panel has
  create/edit/delete/restock. Dashboard (all users) only has browse/search/purchase.
- authStore loads initial state **synchronously** from `localStorage` at
  store creation (not via a `useEffect` hydrate call) — fixes a real race
  condition where page refresh briefly showed `isAuthenticated: false` and
  bounced authenticated users to `/login`.

## 8. Known tricky fixes already resolved (don't redo these)

- **Windows + Jest + ESM**: `node_modules/.bin/jest` is a shell shim that
  breaks on Windows `node` — use `node_modules/jest/bin/jest.js` instead.
  Jest config lives in `package.json`'s `"jest"` key (not a separate
  `jest.config.ts`/`.js` file — caused resolution ambiguity before).
- **tsconfig split**: base `tsconfig.json` (used by Jest/tests, no
  `outDir`/`rootDir`) vs `tsconfig.build.json` (extends base, adds
  `outDir`/`rootDir`, excludes `tests/`) — needed because `tsc` build mode
  rejects files outside `rootDir` if `tests/` is in `include`.
- **Express 5**: `req.params.id` types as `string | string[] | undefined` —
  never cast directly; use `parseIdParam()` (Zod-backed validator in
  `src/validators/params.validator.ts`).
- **Tailwind v4 migration**: no `tailwind.config.js` needed; theme lives in
  `src/index.css` via `@theme inline { ... }`. Dark mode needs
  `@custom-variant dark (&:where(.dark, .dark *));` explicitly, or the
  `.dark` class toggle does nothing visually (v4 defaults `dark:` to
  `prefers-color-scheme`, not class-based).
- **Vitest 4 automocking**: `vi.mock(path)` with no factory no longer
  reliably auto-mocks all exports — always pass an explicit factory
  `vi.mock(path, () => ({ fnName: vi.fn() }))`.
- **jest-dom types**: need `"types": ["vitest/globals", "@testing-library/jest-dom"]`
  in `tsconfig.app.json`, AND `"tests"` added to that config's `include`
  array (not just `"src"`) — otherwise test files don't get matcher types
  even if `src/vite-env.d.ts` has the triple-slash reference.
- **`erasableSyntaxOnly` / "used as a type" errors**: almost always a real
  typo where a value name (e.g. component `VehicleCard`) got used in a type
  position by mistake — fix the typo, don't disable the compiler flag.

## 9. Commit convention (must keep using this)

Every commit that used AI assistance ends with a co-author trailer:

```
<type>: <what changed>

Used Claude to <specific thing — not generic>; manually <specific
thing the developer did/decided>.

Co-authored-by: Claude <claude@users.noreply.github.com>
```

The middle paragraph must be **specific and vary per commit** — not a
copy-pasted generic line — this is part of what the evaluators are checking
for authenticity. Code and its matching commit are given interleaved
(code → commit → next code → next commit), never all code then all commits.

## 10. Deliverables status (all done as of submission)

- [x] README.md — full project explanation, tech stack + rationale, features,
      demo credentials, "My AI Usage" (Claude detailed, ChatGPT supplementary),
      contact info
- [x] SETUP.md — clone/env/install/run/troubleshooting
- [x] SAMPLE_DATA.md — 4 user accounts (2 user, 2 admin), 8 vehicles (2 out of stock)
- [x] TEST_REPORT.md — 23 backend tests + 19 frontend tests, all passing
- [x] SCREENSHOTS.md — reference structure, images to be dropped in `./screenshots/`
- [x] PROMPTS.md — AI chat/prompt log (done by user, parallel)
- [x] Postman collection — exported, all routes verified incl. role-based 403s
- [x] `/docs` + `/docs/json` — hand-rolled API reference (no swagger-ui-express dep)
- [x] Deployed — frontend + backend on Vercel, CORS resolved
- [x] Both test suites green: backend 23/23, frontend 19/19

## 11. If resuming for a technical interview

Likely asks: explain SOLID application (point to repository interfaces +
service layer), explain TDD process (point to fake-repository unit tests
preceding implementation commits), explain AI usage (point to README's "My
AI Usage" section — be ready to discuss the Tailwind v4 dark-mode bug and
the auth hydration race condition specifically, since those required real
debugging, not just code generation), and be ready to live-code a small
addition or fix following the same conventions above (interleaved
code→commit, TDD red-green-refactor, TS strict, tests in top-level `tests/`).

Do NOT reintroduce user-side create/update vehicle privileges — this was
explicitly decided against per spec re-read.
