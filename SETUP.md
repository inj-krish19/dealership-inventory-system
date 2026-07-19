# AutoLot — Setup Guide

Get the project running locally in a few minutes. This guide assumes you have
Node.js 18+ installed and a MongoDB Atlas cluster (or local MongoDB) ready.

## 1. Clone the repository

```bash
git clone https://github.com/<your-username>/dealership-inventory-system.git
cd dealership-inventory-system
```

## 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (copy from `.env.example`):

```
PORT=5000
DOMAIN=http://localhost
FRONTEND_URL=http://localhost:5173
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/autolot?retryWrites=true&w=majority
JWT_SECRET=replace_with_long_random_string
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

Replace `<user>`, `<password>`, and `<cluster>` with your own MongoDB Atlas
credentials. `JWT_SECRET` can be any long random string — generate one with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Run the backend:

```bash
npm run dev
```

Server starts on `http://localhost:5000`. Confirm it's alive:

```bash
curl http://localhost:5000/health
```

## 3. Frontend setup

Open a second terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/` (copy from `.env.example`):

```
VITE_BACKEND_URL=http://localhost:5000
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

App opens on `http://localhost:5173`.

## 4. Seed sample data

The app starts with an empty database. See **[SAMPLE_DATA.md](./SAMPLE_DATA.md)**
for ready-to-use user and vehicle records.

**Users** — register via the app's `/register` page or `POST /api/auth/register`
(see SAMPLE_DATA.md for the exact payloads and credentials). To make an account
an admin, open MongoDB Atlas → your cluster → Collections → `users` → find the
document → edit `role` field to `"admin"`.

**Vehicles** — insert directly into the `vehicles` collection via Atlas UI or
`mongosh`, using the JSON records in SAMPLE_DATA.md. No hashing needed for
vehicle records.

## 5. Verify everything works

1. Visit `http://localhost:5173` — you should see the AutoLot landing page.
2. Register or log in with a sample user.
3. Visit `/dashboard` — you should see the seeded vehicles, with search/filter
   working and out-of-stock vehicles showing a disabled purchase button.
4. Log in with an admin account — you should see an "Admin Panel" link in the
   navbar, and be able to add, edit, delete, and restock vehicles.
5. Toggle light/dark mode from the navbar — should switch instantly.

## 6. Run tests

**Backend:**

```bash
cd backend
npm test
```

**Frontend:**

```bash
cd frontend
npm test
```

Both suites should pass fully. See [TEST_REPORT.md](./TEST_REPORT.md) for the
latest recorded results.

## 7. Build for production (optional)

**Backend:**

```bash
cd backend
npm run build
npm start
```

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

## Troubleshooting

- After setting up these are some of the issue might be face with solution.

| Issue                                    | Fix                                                                                                                |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `MongoNetworkError` / connection timeout | Confirm your IP is whitelisted in Atlas → Network Access, and `MONGO_URI` credentials are correct                  |
| CORS error in browser console            | Confirm `FRONTEND_URL` in backend `.env` matches the frontend's actual origin exactly (including port)             |
| 401 on every request after login         | Check `VITE_API_URL` in frontend `.env` points to the correct backend `/api` path                                  |
| Admin Panel link not showing             | Confirm the logged-in user's `role` field is `"admin"` in the database — this isn't settable from the UI by design |
