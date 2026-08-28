# Thanveer Ahammed N — Portfolio (MERN)

A personal portfolio rebuilt as a true **MERN** stack: a component-based React
client and an Express/MongoDB REST API in an MVC layout, in one npm-workspaces
monorepo.

## Architecture

```
my-portfolio/
├── client/                     # React 19 + Vite + TypeScript (component-based)
│   ├── index.html              # SPA shell, fonts, pre-paint theme script
│   ├── src/
│   │   ├── main.tsx            # ViteReactSSG entry
│   │   ├── App.tsx            # route table
│   │   ├── routes/             # one component per page
│   │   ├── components/
│   │   │   ├── layout/        # Nav, Footer, Layout (providers + <Outlet/>)
│   │   │   ├── sections/      # homepage sections
│   │   │   ├── ui/            # shadcn/ui primitives (Radix)
│   │   │   ├── motion/        # scroll-snap + parallax + tilt
│   │   │   ├── three/         # WebGL hero (lazy)
│   │   │   └── case-study/    # project detail blocks
│   │   ├── lib/               # api client, data hooks, types, site meta
│   │   └── generated/         # build-time API snapshot (git-ignored)
│   └── scripts/               # snapshot-content.mjs, ensure-generated.mjs
│
└── server/                     # Express + Mongoose + TypeScript (MVC)
    ├── src/
    │   ├── server.ts / app.ts # bootstrap + middleware wiring
    │   ├── config/            # env validation, Mongo connection
    │   ├── models/            # M — Mongoose schemas
    │   ├── controllers/       # C — request handlers
    │   ├── routes/            # URL → controller
    │   ├── services/          # business logic (email, feeds, content)
    │   ├── views/             # V — JSON serializers + XML templates
    │   └── middleware/        # error handler, validation, rate limit
    └── seed/                  # seed.ts + content sources (projects, blog .mdx)
```

**Component-based client** — every screen is a route-level component composed
from small presentational components; content comes from the API via typed hooks
(`src/lib/queries.ts`).

**MVC server** — Mongoose **models** are the source of truth, **controllers**
stay thin (parse → call a service → send a serialized view), **routes** only map
URLs to controllers, and **views** (`views/serializers.ts`, `views/*.xml`) own
the wire format.

### Stack

| Layer | Tech |
| --- | --- |
| Client | React 19, Vite 6, React Router 6, `vite-react-ssg` (static prerender), Tailwind CSS v4, Framer Motion, three.js / R3F, `react-markdown` |
| Server | Node, Express 4, Mongoose 8, Zod, Resend, `express-rate-limit`, Helmet |
| Database | MongoDB |

## Prerequisites

- Node 20+
- A MongoDB instance (local `mongod`, or a MongoDB Atlas URI)

## Setup

```bash
npm install

# server env
cp server/.env.example server/.env      # set MONGODB_URI (+ RESEND_* to enable email)

# load content into MongoDB (projects, experience, skills, blog posts)
npm run seed
```

## Develop

```bash
npm run dev          # server on :4000, client on :5173 (Vite proxies /api, /rss.xml, …)
```

Individual workspaces: `npm run dev:server`, `npm run dev:client`.

## Build

```bash
# The client snapshots the API at build time for prerendering, so the API must be
# reachable. Point VITE_API_URL at a running/deployed API:
VITE_API_URL=http://localhost:4000 npm run build
```

- `server/dist/` — compiled API (`npm start` runs `server/dist/server.js`)
- `client/dist/` — static site; every route prerendered to HTML with per-page
  `<title>`/meta/JSON-LD. Dynamic `projects/:slug` and `blog/:slug` pages are
  expanded from `client/src/generated/routes.json` (written by the snapshot step).

If the API is unreachable at build time the build still succeeds — dynamic pages
fall back to client-side rendering.

## API

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/projects` · `/api/projects/:slug` | projects / case studies |
| `GET` | `/api/posts` · `/api/posts/:slug` | blog list (meta) / single post (markdown) |
| `GET` | `/api/experience` | work history |
| `GET` | `/api/skills` | skill categories + highlighted integrations |
| `POST` | `/api/contact` | validated, rate-limited; stores a `Message` and emails via Resend |
| `GET` | `/rss.xml` · `/sitemap.xml` · `/robots.txt` | feeds, built from the DB |

## Environment

**server/.env**

| Var | Notes |
| --- | --- |
| `PORT` | default `4000` |
| `CLIENT_URL` | comma-separated allowed CORS origins (client dev + prod URLs) |
| `PUBLIC_SITE_URL` | absolute site URL used in `sitemap.xml` / `rss.xml` |
| `MONGODB_URI` | **required** |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL` | optional — blank disables sending (submissions still stored) |
| `CONTACT_FROM_EMAIL` | optional verified sender |

**client/.env**

| Var | Notes |
| --- | --- |
| `VITE_API_URL` | API origin for production builds; unset in dev (Vite proxy) |

## Deployment

The two apps deploy independently:

- **client** — static host (Vercel, Netlify, Cloudflare Pages). Build with
  `VITE_API_URL` set. Add an SPA fallback to `index.html` for unmatched routes
  (the 404 page), and route `/rss.xml`, `/sitemap.xml`, `/robots.txt` to the API
  (proxy or redirect) if you want them on the apex domain.
- **server** — any Node host (Render, Railway, Fly, a VM). Set the env vars, run
  `npm run build --workspace server` then `npm start --workspace server`. Run
  `npm run seed` once against the production database.

## Author

**Thanveer Ahammed N** — Software Developer
[GitHub](https://github.com/thanveer006) · [LinkedIn](https://www.linkedin.com/in/thanveer-ahammed-dev)
