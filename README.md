# CodeCult Studio

Agency website for CodeCult Studio: websites + WhatsApp & Google setup for local businesses.
Built with Next.js 16 (App Router), Tailwind CSS v4, Motion and Lenis.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Where things live

| What | Where |
| --- | --- |
| Prices (tiers + services) | `src/data/samples.ts` → `TIERS`, `SERVICES` |
| The 12 sample websites (cards, previews) | `src/data/samples.ts` → `SAMPLES` (set `ready: true` once a live demo exists) |
| Hero business picker | `src/data/hero-niches.ts` |
| WhatsApp number, Instagram, location | `src/lib/site.ts` |
| Landing page sections | `src/components/sections/*` |
| Fonts | `src/lib/fonts.ts` |
| Photos | `public/images/samples/*` (Unsplash, free licence) |

## Still to fill in

- Real CodeCult community story: `src/components/sections/About.tsx` (marked `TODO(content)`).
