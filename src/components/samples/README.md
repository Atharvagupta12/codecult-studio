# Sample websites

Each sample is a complete, self-contained website that lives inside the CodeCult site.
Everything for one sample sits in three predictable places:

| What | Where |
| --- | --- |
| Components, data, fonts | `src/components/samples/<slug>/` |
| Routes (pages) | `src/app/samples/<slug>/` |
| Photos | `public/images/<slug>/` |
| Card on the landing page (name, price, tier, preview) | `src/data/samples.ts` → `SAMPLES` |
| Card cover photo | `public/images/covers/<slug>.jpg` |

## Built so far

| Niche | Essential ₹7,999 | Signature ₹9,999 | Premium ₹12,999 |
| --- | --- | --- | --- |
| Café | `brew-lane` (1 page) | `kulhad-co` (4 pages) | `ember` → route `ember-bistro` (6 pages) |
| Gym | `pulse-fitness` (1 page) | `ironpeak` (4 pages) | `forge-athletics` (6 pages) |
| Portfolio | `riya-sharma` (1 page) | `kabir-rao` (4 pages + case studies) | `aarav-mehta` (6 pages + story pages) |
| Beauty & jewellery | `glow-studio` | `kalaa-jewels` | `mehr-bridal` |

Café, gym and portfolio rows are built; the others show "Live demo coming soon" until `ready: true`.

## Shared pieces (`shared/`)

- `DemoProvider` – wraps every sample; holds the "What's included" tour state and the explainer sheet.
- `DemoChrome` – the CodeCult bar at the bottom (Back to CodeCult, tier + price, What's included, Build this for me),
  the tour panel and the explainer sheet. Pass it a list of `TourItem`s.
- `Feature` – wrap any part of a sample in `<Feature id="…" label="…">` so the tour can outline and scroll to it.
- `useOpenStatus` – live "Open now · till 11 pm" status in Indian time (handles past-midnight closing).
- `indiaTime` – `useIndiaNow()` (current weekday + minutes in India, for "live now / up next" schedules) and `fmtTime()`.

Buttons that would contact the business (WhatsApp, call) call `useDemo().explain(...)` instead,
which shows the visitor what would happen on their real site.

## Adding a new sample

1. Create `src/components/samples/<slug>/` with `fonts.ts`, `data.ts`, `shared.tsx` and the page components.
2. Create `src/app/samples/<slug>/page.tsx` (one page) or a `layout.tsx` + pages (multi-page).
   Wrap with `<DemoProvider sample={getSample("<slug>")}>` and render `<DemoChrome tourItems={…} />`.
3. Put photos in `public/images/<slug>/` (Unsplash, free licence).
4. Set `ready: true` for the sample in `src/data/samples.ts`. The landing card links to the demo automatically.

Dynamic pages (kabir-rao case studies, aarav-mehta stories) use `generateStaticParams` and read `params` inside `<Suspense>`, which Cache Components requires.

Sample routes are `noindex` (see `src/app/samples/layout.tsx`) so these fictional businesses never show up on Google.
