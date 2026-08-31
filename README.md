# Tintinkss by Jia — Website

A full-bleed, scroll-driven Next.js site for Tintinkss, a handmade ceramics studio in Kottayam, Kerala.

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v3
- Framer Motion (animation)
- Lenis (smooth scrolling)
- lucide-react (icons)

## Fonts
- **Fraunces** (display headlines + italic body/story copy) — a variable serif built with a deliberately "wonky" optical-size mode, chosen to echo the slightly irregular, hand-thrown character of the pottery itself
- **Instrument Sans** (UI/body text)
- **Caveat** (handwritten accents — signatures, small marginalia)

## Animation
This build leans heavily into motion:
- Pottery-wheel-style intro loader on first load
- Custom cursor that grows over links/buttons (disabled automatically on touch devices and for visitors with reduced-motion enabled)
- Split-text, word-by-word reveals on every major heading
- Scroll-linked parallax on the hero, artist photo, and gallery cards
- Magnetic buttons/links that pull toward the cursor
- 3D tilt on collection rows, SVG line-draw between commission steps, double-row marquee on the Instagram strip
- Every animation respects `prefers-reduced-motion` and falls back to instant/static states

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. Requires an internet connection on first build so Next.js can fetch the Google Fonts (Archivo Black, Caveat, Lora, Work Sans).

## Editing content

All site copy lives in one place: `lib/content.ts` — hero text, artist story, product collection, gallery captions, commission steps, studio hours, and FAQ. Edit that file to update anything without touching component code.

## Structure

- `app/layout.tsx` — fonts + global providers
- `components/SmoothScroll.tsx` — Lenis smooth-scroll wrapper
- `components/Nav.tsx` — sticky nav + full-screen mobile menu
- `components/sections/` — one file per homepage section (Hero, ArtistStory, Collection, Gallery, Commissions, Visit, FAQ, InstagramStrip, Footer)
- `lib/content.ts` — all copy/content

## Notes
- Reduced-motion is respected: Lenis smooth scroll and CSS animations both fall back to instant behavior if the visitor has "reduce motion" set in their OS.
- The Instagram grid and gallery currently use placeholder color blocks in the brand palette — swap in real product photography by replacing the tile divs in `components/sections/Gallery.tsx` and `components/sections/InstagramStrip.tsx` with `<Image />` components.
