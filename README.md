# CodeCult Studio

Agency website for CodeCult Studio: websites + WhatsApp & Google setup for local businesses,
plus the live sample websites clients can buy.
Built with Next.js 16 (App Router), Tailwind CSS v4, Motion and Lenis.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Project map

```
src/
  app/
    page.tsx                 CodeCult landing page
    samples/<slug>/          one folder per sample website (routes)
  components/
    hero/, sections/, ui/    landing page building blocks
    samples/                 sample websites (see src/components/samples/README.md)
      shared/                demo bar, feature tour, open-now status, India clock
      brew-lane/  kulhad-co/  ember/                       café samples
      pulse-fitness/  ironpeak/  forge-athletics/          gym samples
  data/
    samples.ts               prices, tiers, the 12 sample cards
    hero-niches.ts           hero business picker
  lib/
    site.ts                  WhatsApp number, Instagram, location
    fonts.ts                 landing page + card preview fonts
public/images/
  covers/                    sample card cover photos
  landing/                   photos used on the landing page
  <slug>/                    photos for each sample website
```

## Where to change things

| What | Where |
| --- | --- |
| Prices (tiers + services) | `src/data/samples.ts` → `TIERS`, `SERVICES` |
| Sample cards on the landing page | `src/data/samples.ts` → `SAMPLES` (`ready: true` once the demo is live) |
| WhatsApp number, Instagram, location | `src/lib/site.ts` |
| Landing page sections | `src/components/sections/*` |

## Still to fill in

- Real CodeCult community story: `src/components/sections/About.tsx` (marked `TODO(content)`).
