# Conference

Live conference agenda app: a Vue frontend and an Express/MongoDB backend.

- **`Front/`** — Vue 3 + Vite app. Hero section, live agenda grid, live-announcement/reminder banners, an `/admin` page for CRUD on sessions and announcements. See [Front/README.md](Front/README.md).
- **`Backend/`** — Express API backed by MongoDB. Serves `/api/sessions` and `/api/announcements` (GET/POST/PUT/DELETE), and serves `Front/dist` in production.

## Running locally

Two terminals:

```bash
# terminal 1
cd Backend
cp .env.example .env   # fill in your real MongoDB connection string
npm install
npm run dev

# terminal 2
cd Front
npm install
npm run dev
```

Frontend dev server proxies `/api/*` to `http://localhost:3000` (see `Front/vite.config.js`), so both need to be running.

## Production

```bash
cd Front && npm run build
cd ../Backend && npm start
```

The backend serves the built frontend and the API from the same origin — no proxy needed.

## Environment variables (`Backend/.env`)

| Variable  | Description                          |
| --------- | ------------------------------------- |
| `DB_PATH` | MongoDB Atlas connection string       |
| `DB_NAME` | Database name (default: `conference`) |
| `PORT`    | API/server port (default: `3000`)     |

Never commit `.env` — it holds live credentials. `.env.example` shows the required shape with placeholders.
