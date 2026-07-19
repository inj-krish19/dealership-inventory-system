# AutoLot — Car Dealership Inventory System

A full-stack dealership inventory management system built with the MERN
stack and TypeScript. Users can browse and search a live vehicle catalog and
purchase vehicles; admins get exclusive control over deleting listings and
restocking inventory — all secured behind JWT authentication and role-based
access control.

Built as a 48-hour placement kata, following strict Test-Driven Development
(Red-Green-Refactor), SOLID architecture, and transparent AI-assisted
development practices.

**Live demo:** [dealership-inventory-system.vercel.app](https://dealership-inventory-system.vercel.app/)

---

## Table of Contents

- [Idea & Approach](#idea--approach)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [My AI Usage](#my-ai-usage)
- [Screenshots](#screenshots)
- [Contact](#contact)

---

## Idea & Approach

AutoLot models a real dealership's inventory workflow: vehicles are listed
with make, model, category, price, and stock quantity; any authenticated
user can browse, search, and purchase; only admins can delete listings or
restock inventory. The build followed the assignment's process requirements
end to end — TDD with visible red/green commits, a 3-layer backend
architecture (controller → service → repository) applying SOLID principles
(particularly Dependency Inversion, via repository interfaces mocked in unit
tests), and full transparency on AI tool usage throughout.

## Tech Stack

### Backend

| Tool                           | Purpose                              |
| ------------------------------ | ------------------------------------ |
| **Node.js + Express**          | HTTP server and routing              |
| **TypeScript**                 | Type safety across the whole backend |
| **MongoDB (Atlas) + Mongoose** | Database and schema modeling         |
| **JWT (jsonwebtoken)**         | Token-based authentication           |
| **bcryptjs**                   | Password hashing                     |
| **Zod**                        | Request payload validation           |
| **Jest + Supertest**           | Unit and integration testing         |
| **tsx**                        | Dev-time TypeScript execution        |

**Why Express + TypeScript over NestJS:** the assignment listed "Node.js/TypeScript"
as one bundled option alongside Django/FastAPI and Rails, read as a call for
TypeScript specifically rather than plain JS. Express + TS was chosen over
NestJS to build on existing MERN experience rather than absorb a new
framework's conventions under a 48-hour deadline, while still getting full
type safety and a clean layered architecture by hand.

### Frontend

| Tool                               | Purpose                              |
| ---------------------------------- | ------------------------------------ |
| **React + Vite**                   | UI framework and build tooling       |
| **TypeScript**                     | Type safety across all components    |
| **Tailwind CSS v4**                | Styling, CSS-first theme config      |
| **Zustand**                        | Global state (auth session, theme)   |
| **React Router**                   | Client-side routing and route guards |
| **Framer Motion**                  | Page/component animation             |
| **Axios**                          | HTTP client with JWT auto-attachment |
| **React Icons**                    | Icon set                             |
| **Vitest + React Testing Library** | Component and unit testing           |

**Why React + TypeScript:** paired with the backend's TS-first approach for
a single, consistent type language across the stack — shared mental models
for DTOs and API contracts, and compile-time safety on both sides of every
request/response.

## Features

- JWT-based registration and login
- Role-based access control (`user` / `admin`) enforced server-side on every
  protected route, not just hidden in the UI
- Vehicle catalog with search/filter by make, model, category, and price range
- Purchase flow with live stock decrement and out-of-stock UI state
- Admin panel: add, edit, delete, and restock vehicles
- Light/dark theme with persistent preference and system-preference detection
- Fully responsive, animated UI (Framer Motion) with a premium visual design

## Project Structure

```
dealership-inventory-system/
├── backend/
│   ├── src/
│   │   ├── config/          # env, DB connection
│   │   ├── models/           # Mongoose schemas
│   │   ├── repositories/     # interfaces + Mongo implementations
│   │   ├── services/         # business logic
│   │   ├── controllers/      # thin HTTP handlers
│   │   ├── routes/
│   │   ├── middleware/       # auth, role guards
│   │   ├── validators/       # Zod schemas
│   │   └── utils/
│   └── tests/
│       ├── unit/
│       └── integration/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/            # Zustand stores
│   │   ├── services/         # API layer
│   │   ├── types/
│   │   └── App.tsx
│   └── tests/
│       ├── unit/
│       └── pages/
├── SETUP.md
├── TEST_REPORT.md
├── SAMPLE_DATA.md
├── SCREENSHOTS.md
├── PROMPTS.md
└── README.md
```

## Getting Started

Full local setup instructions — cloning, environment variables, installing
dependencies, and running both servers — are documented in
**[SETUP.md](./SETUP.md)**.

Sample user and vehicle records for seeding a fresh database are in
**[SAMPLE_DATA.md](./SAMPLE_DATA.md)**.

## Testing

The project follows strict TDD (Red-Green-Refactor) throughout, visible in
the commit history — failing tests are committed before their implementation.

- **Backend:** 8 test files, 24 tests (Jest + Supertest) — unit tests for
  services and models, integration tests for auth, vehicles, and DB/health
- **Frontend:** 6 test files, 19 tests (Vitest + React Testing Library) —
  store, route guards, components, and page-level flows

Full results, suite breakdown, and manual/Postman API verification are
documented in **[TEST_REPORT.md](./TEST_REPORT.md)**.

## My AI Usage

Two AI tools were used throughout this project, with full transparency per
the assignment's requirements. Every AI-assisted commit carries a
`Co-authored-by` trailer, and the complete prompt history is logged in
**[PROMPTS.md](./PROMPTS.md)**.

### Claude (Anthropic) — primary development partner

Claude was used as the main pair-programming partner across the entire
48-hour build, end to end:

- **Architecture planning:** deciding the tech stack (MERN + TypeScript over
  NestJS), the 3-layer backend structure (controller → service →
  repository), and how SOLID principles apply concretely in a kata-scale
  project without over-engineering.
- **TDD cycles:** writing failing tests first for `AuthService` and
  `VehicleService` against fake in-memory repositories, then implementing
  the minimum code to pass them, cycle by cycle.
- **Code generation:** scaffolding models, controllers, validators, routes,
  middleware, and React components/pages, iterated on and manually adjusted
  at each step.
- **Bug and configuration resolution** — the majority of hands-on debugging
  time went here:
  - Fixing an **Express 5 typing regression** (`req.params.id` typed as
    `string | string[]`) with a dedicated Zod-backed param validator
    instead of an unsafe cast.
  - Diagnosing a **Mongoose `Document` method collision** where a `model`
    field on the `Vehicle` interface clashed with `Document.model()`,
    solved by renaming to `modelName` internally and adding a DTO mapper
    to preserve the spec's `model` field in the public API contract.
  - Tracing a **Tailwind v4 migration issue** where the dark-mode toggle
    updated `localStorage` and the DOM class correctly but rendered nothing,
    because v4 doesn't read `tailwind.config.js` and defaults `dark:` to
    `prefers-color-scheme` rather than class-based — fixed with
    `@custom-variant dark` and CSS-first `@theme` tokens.
  - Fixing a **Vitest 4 automocking behavior change** that broke
    `vi.mocked().mockResolvedValueOnce()`, resolved with explicit mock
    factories instead of relying on automocking.
  - Diagnosing an **auth session race condition** where `hydrate()` running
    inside a `useEffect` caused a false "logged out" state on page refresh
    before `localStorage` was read — fixed by loading Zustand's initial
    state synchronously at store creation instead of reactively.
- **Commit hygiene:** every commit message and AI co-author trailer in this
  repo's history was drafted with Claude, kept specific to what was actually
  asked vs. manually adjusted per commit rather than a generic boilerplate line.

### ChatGPT — supplementary use

Used in a smaller, supporting capacity alongside Claude for quick sanity
checks, alternative phrasing on a couple of edge-case scenarios, and
cross-referencing specific error messages against community-reported fixes
during the Windows/Jest configuration troubleshooting phase.

- **Bug and configuration resolution** — the majority of hands-on debugging
  time went here:
  - Diagnosing and fixing repeated **Jest/TypeScript/ESM configuration
    conflicts** on Windows: the `.bin/jest` shell-shim failing under
    `node` on Windows, `ts-node` being required to parse a `.ts` Jest
    config, and eventually consolidating Jest config into `package.json`
    to remove file-resolution ambiguity entirely.
  - Resolving a **`tsconfig.json` `rootDir` conflict** where `tsc` refused
    to build because `tests/` was included alongside a `src`-scoped
    `rootDir` — solved by splitting into a base config (used by Jest/tests)
    and a narrower `tsconfig.build.json` (used only for `dist` emission).

### Reflection

AI tooling meaningfully compressed the timeline on a 48-hour deadline —
especially the configuration/tooling debugging (Jest+ESM+Windows,
Tailwind v4 migration, TS strictness changes across Express 5/Vitest 4)
that would otherwise have eaten a disproportionate share of the available
time relative to actual feature work. The discipline that mattered most was
verifying every suggestion against the failing test or actual error message
rather than accepting output blindly — several fixes here required multiple
iterations because the first proposed fix addressed a symptom rather than
the root cause (e.g. the Tailwind v4 dark-mode issue took tracing through
_why_ the class toggle wasn't rendering anything, not just re-styling
components). AI accelerated implementation; understanding _why_ each fix
worked stayed a manual, deliberate step throughout.

## Screenshots

See **[SCREENSHOTS.md](./SCREENSHOTS.md)** for a full visual walkthrough of
the application — landing page, auth flows, dashboard, admin panel, and both
theme modes.

## Contact

**Krish Shah**

- Email: kglivee19@gmail.com / krishshah19.in@gmail.com
- GitHub: [github.com/inj-krish19](https://github.com/inj-krish19)
- LinkedIn: [linkedin.com/in/inj-krish19](https://www.linkedin.com/in/inj-krish19/)

**Project Links**

- Repository: [github.com/inj-krish19/dealership-inventory-system](https://github.com/inj-krish19/dealership-inventory-system)
- Live App: [dealership-inventory-system.vercel.app](https://dealership-inventory-system.vercel.app/)
- Live API: [dealership-inventory-system-api.vercel.app](https://dealership-inventory-system-api.vercel.app/)
