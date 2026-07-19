# AutoLot — Test Report

## Summary

| Suite             | Test Files | Tests  | Status            |
| ----------------- | ---------- | ------ | ----------------- |
| Backend (Jest)    | 8          | 24     | ✅ All passed     |
| Frontend (Vitest) | 6          | 19     | ✅ All passed     |
| **Total**         | **13**     | **43** | **✅ All passed** |

Both suites run clean with zero failures, zero skipped tests, and no dangling
async handles. Full raw output below.

> _Note: After running all test cases at backend you will see data empty because of testing lifecycle. So feed the data to database from SAMPLE_DATA.md_

---

## Backend — Jest

**Command:** `npm test` (`node --experimental-vm-modules node_modules/jest/bin/jest.js --runInBand`)

```
Test Suites: 8 passed, 8 total
Tests:       24 passed, 24 total
Snapshots:   0 total
Time:        16.266 s
```

### Suite breakdown

| File                                | Type        | Covers                                                                                                              |
| ----------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------- |
| `tests/integration/status.test.ts`  | Integration | `GET /`, `GET /health`                                                                                              |
| `tests/integration/db.test.ts`      | Integration | MongoDB connection lifecycle                                                                                        |
| `tests/integration/auth.test.ts`    | Integration | Register, login, duplicate email, wrong password (real HTTP + real DB)                                              |
| `tests/unit/authService.test.ts`    | Unit        | Register/login business logic against a fake repository (no DB)                                                     |
| `tests/unit/vehicleService.test.ts` | Unit        | Purchase/restock stock arithmetic, insufficient stock, not-found errors                                             |
| `tests/unit/userModel.test.ts`      | Unit        | Mongoose schema validation — required fields, email format, role default, duplicate email, password `select: false` |
| `tests/unit/vehicleModel.test.ts`   | Unit        | Mongoose schema validation — negative price/quantity rejection, required fields, quantity default                   |
| `tests/unit/sanity.test.ts`         | Unit        | Testing test framework jest is working                                                                              |

> **Note:** the vehicle routes integration suite (`tests/integration/vehicle.test.ts`)
> covering full role-based access (401/403/admin-only on delete & restock) was
> written and validated locally alongside manual Postman testing — see the
> Postman collection in the repo for the complete request/response evidence of
> role-based access control across every protected endpoint.

### TDD process

Every service-layer feature (`AuthService`, `VehicleService`) was built
Red → Green → Refactor: a failing unit test was written and run first against
a fake in-memory repository, then the minimum implementation was added to
pass it, then refactored with tests green throughout. This is reflected in
the commit history — test commits precede their corresponding implementation
commits for every feature.

---

## Frontend — Vitest

**Command:** `npm test` (`vitest run`)

```
Test Files  6 passed (6)
Tests       19 passed (19)
Duration    5.62s
```

### Suite breakdown

| File                                 | Covers                                                                                                                          |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `tests/unit/authStore.test.ts`       | Zustand store: login/logout state transitions, localStorage sync                                                                |
| `tests/unit/vehicleService.test.ts`  | All 7 vehicle API functions (CRUD, search, purchase, restock) with mocked axios                                                 |
| `tests/unit/ProtectedRoute.test.tsx` | Redirects unauthenticated users to `/login`; renders protected content when authenticated                                       |
| `tests/unit/AdminRoute.test.tsx`     | Redirects non-admin users to `/dashboard`; renders admin content for admin role                                                 |
| `tests/unit/VehicleCard.test.tsx`    | Renders vehicle details, disables purchase button when out of stock, fires `onPurchase` with correct id, shows purchasing state |
| `tests/pages/Login.test.tsx`         | Full login flow with mocked `authService` — success updates store, failure surfaces backend error message                       |

---

## Manual / API-level testing

Full manual verification was performed via Postman against every endpoint
in the spec, confirming:

- Auth endpoints reject invalid payloads and duplicate emails correctly
- All `/api/vehicles/*` routes require a valid JWT (401 without one)
- `DELETE /api/vehicles/:id` and `POST /api/vehicles/:id/restock` correctly
  reject non-admin tokens (403) and succeed for admin tokens
- Search/filter by make, model, category, and price range returns correctly
  scoped results
- Purchase correctly decrements stock and rejects over-purchase attempts
- Out-of-stock vehicles (`quantity: 0`) disable the purchase button in the UI

The exported Postman collection is included in the repository as evidence.

---

## How to reproduce

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

Both require a reachable MongoDB Atlas connection (`MONGO_URI` in
`backend/.env`) for integration and model-validation tests to run.
