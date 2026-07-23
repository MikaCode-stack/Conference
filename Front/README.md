# Conference Frontend

Vue 3 + Vite frontend for the live conference agenda. See the [project root README](../README.md) for how this fits together with `Backend/`.

## Development

```bash
npm install
npm run dev
```

Requires `Backend/` running on port 3000 — `vite.config.js` proxies `/api` requests there in dev.

## Build

```bash
npm run build
```

Outputs to `dist/`, which the backend serves directly in production.
