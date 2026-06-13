# dhgoncalves — Portfolio

Personal portfolio of Diego Gonçalves, RPA Developer. Built with React + TypeScript + Vite, deployed on Vercel with Strava API integration, bilingual support (EN/PT), and dark/light theme.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18.3 |
| Language | TypeScript 5.8 |
| Build tool | Vite 5.4 (SWC plugin) |
| Styling | Tailwind CSS 3.4 + CSS custom properties (HSL) |
| UI primitives | shadcn/ui (Radix UI) |
| Animations | Framer Motion 12 |
| Icons | Lucide React + @iconify/react |
| Server state | TanStack React Query v5 |
| Routing | React Router DOM v6 |
| Theme | next-themes |
| Analytics | Vercel Analytics + react-ga4 (GA4) |
| Deploy | Vercel (Serverless Functions + SPA rewrite) |
| Runtime | Node.js via @vercel/node |

---

## Project Structure

```
.
├── api/
│   └── strava.ts            # Vercel Serverless Function — Strava OAuth token exchange
├── public/
│   └── assets/              # Static images, logos, CV PDF
├── src/
│   ├── components/          # All page sections and UI components
│   ├── config/
│   │   └── site.ts          # Central URL config (reads from env vars)
│   ├── content/
│   │   └── translations.ts  # Full EN + PT copy
│   ├── context/
│   │   └── LanguageContext.tsx  # i18n React context + useLanguage hook
│   ├── hooks/
│   │   └── useStravaActivities.ts  # Strava fetch + polyline → SVG path
│   ├── pages/
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   └── index.css            # Tailwind base + CSS custom properties
├── vercel.json              # SPA rewrite rule (excludes /api/*)
├── vite.config.ts           # envPrefix: ['VITE_', 'USER_'], dev Strava middleware
└── tailwind.config.ts
```

---

## Sections

| Section | ID | Description |
|---|---|---|
| Hero | `#top` | Typewriter title, social links, scroll-down indicator |
| About | `#about` | Skills grouped by domain (4 groups) |
| Work Experience | `#experience` | Timeline of 3 jobs; click badge to open detail modal |
| Projects | `#projects` | Alternating layout with tech stack badges |
| Hobbies | `#activities` | BentoGrid: sport photo, hobbies, Strava activities, Adidas Running |
| Articles | `#articles` | Paginated article cards |
| Contacts | `#contacts` | CTA footer with contact cards + social links |

---

## API Integrations

### Strava API v3

- **Authentication:** OAuth2 with offline `activity:read_all` scope. A refresh token is exchanged for a short-lived access token on every request.
- **Production:** `api/strava.ts` runs as a Vercel Serverless Function. Reads `STRAVA_CLIENT_ID`, `STRAVA_CLIENT_SECRET`, `STRAVA_REFRESH_TOKEN` from server-side environment variables. Sets `Cache-Control: s-maxage=300, stale-while-revalidate=60`.
- **Development:** A `configureServer` Vite plugin in `vite.config.ts` proxies `/api/strava` locally using the same `.env` vars (only active when `mode === "development"`).
- **Frontend:** `useStravaActivities` hook fetches the 3 most recent activities. For activities with GPS data, the encoded polyline is decoded and rendered as an animated SVG `<motion.path>` with continuous `pathLength` draw animation.

### Vercel Analytics + Google Analytics (GA4)

- Vercel Analytics injected via `@vercel/analytics`.
- GA4 via `react-ga4` — reads `VITE_GA_ID` from env.

---

## i18n

Bilingual EN/PT via `LanguageContext`. All copy lives in `src/content/translations.ts` as a typed `Copy` object. Components consume it via `const { t } = useLanguage()` — object-style access (`t.nav.about`, `t.hero.titles`, etc.). Switching language is instant with no page reload.

---

## Theme

Dark/light mode via `next-themes`. CSS custom properties (`--background`, `--foreground`, `--muted-foreground`, etc.) are defined in `src/index.css` as HSL values for both `:root` (dark) and `.light` class. Tailwind reads them via `hsl(var(--token))` in `tailwind.config.ts`.

---

## Environment Variables

### Server-side (Vercel only — never exposed to client)

| Variable | Description |
|---|---|
| `STRAVA_CLIENT_ID` | Strava app client ID |
| `STRAVA_CLIENT_SECRET` | Strava app client secret |
| `STRAVA_REFRESH_TOKEN` | OAuth2 offline refresh token |

### Client-side (bundled by Vite at build time)

| Variable | Description |
|---|---|
| `VITE_SPORT_PHOTO_URL` | Sport photo shown in the Hobbies photo card |
| `VITE_STRAVA_PROFILE_URL` | Public Strava profile URL |
| `VITE_ADIDAS_RUNNING_URL` | Adidas Running / Runtastic profile URL |
| `VITE_GA_ID` | Google Analytics 4 measurement ID |
| `USER_GITHUB_URL` | GitHub profile URL |
| `USER_LINKEDIN_URL` | LinkedIn profile URL |
| `USER_EMAIL` | Contact email (`mailto:` prefix added automatically if missing) |
| `USER_CONTACT_WPP` | WhatsApp link (`wa.me/...`) |
| `USER_INSTAGRAM_URL` | Instagram profile URL |

> `USER_*` vars are exposed to the client bundle because `vite.config.ts` sets `envPrefix: ['VITE_', 'USER_']`.

---

## Local Development

```bash
# Install dependencies
bun install

# Start dev server (Strava API proxied locally via vite.config.ts middleware)
bun run dev

# Type-check
npx tsc --noEmit

# Production build
bun run build

# Preview production build locally
bun run preview
```

Copy `.env.example` to `.env` and fill in your values before running.

---

## Deploy (Vercel)

1. Push `main` to GitHub
2. Import repository on [vercel.com](https://vercel.com) — framework auto-detected as **Vite**
3. Add all environment variables in **Project Settings → Environment Variables**
4. Deploy — `vercel.json` handles SPA routing and keeps `/api/*` routes pointed at Serverless Functions

---

## Changelog — Implemented Features

- [x] React + TypeScript + Vite (SWC) project setup
- [x] Tailwind CSS with HSL CSS custom properties for dark/light theming
- [x] Dark / light theme toggle (next-themes)
- [x] Bilingual support EN / PT via React Context (full copy in `translations.ts`)
- [x] Language switcher in Navbar with flag emojis (🇺🇸 / 🇧🇷)
- [x] Glass-effect Navbar with scroll-aware opacity
- [x] Full-screen mobile menu with animated link list
- [x] Hero section with typewriter effect cycling 4 titles
- [x] "Scroll down" animated chevron indicator in Hero
- [x] Social link buttons in Hero (GitHub, LinkedIn, Email, Instagram)
- [x] About section with 4 skill groups (RPA Tools, Dev & Scripting, AI & Cloud, Project Management)
- [x] Work Experience section — timeline with 3 real jobs
- [x] Work detail modal (company, role, period, tech stack, description)
- [x] Projects section with alternating layout and tech stack badges
- [x] Hobbies BentoGrid (4-column layout):
  - [x] Sport photo card with grayscale → color transition on scroll-into-view
  - [x] My Hobbies card (Cycling, Running, Futsal with Iconify icons)
  - [x] Strava Connect card linking to public profile
  - [x] 3 latest Strava activities with type icon and animated SVG route map
  - [x] Adidas Running full-width card
- [x] Strava API v3 integration via Vercel Serverless Function
- [x] Encoded polyline → centered SVG path with continuous `pathLength` draw animation
- [x] Articles section with pagination
- [x] Footer / Contacts with 3 contact method cards (Email, LinkedIn, WhatsApp)
- [x] Social links wired to `.env` / Vercel env vars (`USER_*` + `VITE_*`)
- [x] Back-to-top button (appears after 320px scroll, smooth animation)
- [x] Scroll-triggered entrance animations on all sections (Framer Motion `useInView`)
- [x] Responsive design (mobile 390px, tablet, desktop)
- [x] Vercel Analytics + Google Analytics GA4
- [x] `vercel.json` SPA rewrite rule (excludes `/api/*`)
- [x] Profile image asset committed and served from `public/assets/`

---

## Roadmap — Future Improvements

- [ ] SEO meta tags (Open Graph, Twitter Card, JSON-LD structured data)
- [ ] Real articles content with external links (Medium / dev.to)
- [ ] Projects section with live demo URLs and GitHub links
- [ ] Contact form with email delivery (Resend or Nodemailer via Vercel Function)
- [ ] Animated page transitions between route changes
- [ ] System preference detection for initial theme (prefers-color-scheme)
- [ ] PWA support (service worker, manifest, offline page)
- [ ] Image optimisation (WebP conversion, lazy loading with blur placeholder)
- [ ] Accessibility audit (ARIA labels, keyboard navigation, focus trap in modals)
- [ ] Unit and integration test coverage (Vitest + Testing Library)
- [ ] Strava activity stats summary (total km, total time, elevation)
- [ ] CV PDF download button wired to `public/assets/cv_MAIO_2026_DEV_RPA.pdf`
- [ ] Certifications section (Azure AI IA900 badge, etc.)

---

## License

Personal portfolio — all rights reserved. © 2026 Diego Gonçalves.
