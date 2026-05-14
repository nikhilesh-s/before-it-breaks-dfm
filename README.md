# Before It Breaks

A narrative RPG game built as part of the **Dear Future Me (DFM)** platform.
Players navigate a story-driven scenario where choices affect three core stats —
Social, Mental, and Physical — visualized through a three-arc health ring.

---

## Getting started

```bash
npm install
npm run dev
```

---

## Folder structure

```
src/
├── assets/
│   ├── icons/          ← 7 SVG logo/title assets (see below)
│   ├── health-bar/     ← 18 PNG arc segments for the health ring
│   └── fonts/          ← Self-hosted font files (optional; see fonts/README.md)
│
├── components/
│   ├── game/           ← Game-specific components (DialogueBox, ChoiceMenu, …)
│   ├── ui/             ← Reusable primitives (Button, Card, Modal, …)
│   └── layout/         ← Page shell, containers, wrappers
│
├── scenes/             ← One component per game scene (IntroScene, Scene01, …)
├── data/
│   └── story.js        ← Full game script and stat deltas
├── hooks/
│   ├── useGameState.js ← Scene progression + stat tracking
│   └── useHealthBar.js ← Derives arc segments from current stats
├── styles/
│   ├── tokens.css      ← CSS custom properties (colors, fonts, spacing)
│   └── global.css      ← Reset, font imports, base styles
│
├── App.jsx             ← React Router route table
└── main.jsx            ← Entry point (BrowserRouter + global styles)
```

---

## Swapping in real icon assets

All seven icons live in `src/assets/icons/`. Each file is an SVG stub with a
comment describing what it should contain. To replace a placeholder:

1. Export your final SVG from Figma / Illustrator.
2. Drop it into `src/assets/icons/` using the **exact same filename**.
3. Import it in whichever component needs it:
   ```js
   import logo from '../assets/icons/logo-dfm-main.svg';
   ```
4. Delete the old stub — Vite will pick up the replacement on the next hot reload.

| File | Content |
|------|---------|
| `logo-dfm-main.svg` | Main DFM sprout-envelope logo |
| `logo-scissors.svg` | Scissors variation |
| `logo-glue.svg` | Glue variation |
| `logo-pencil.svg` | Pencil variation |
| `logo-notebook.svg` | Notebook variation |
| `title-before-it-breaks.svg` | Game title graphic |
| `logo-variant-extra.svg` | Additional logo / title slot |

---

## How the health bar image system works

The health ring is made of **18 PNG files** in `src/assets/health-bar/`:

| Group | Files | Color |
|-------|-------|-------|
| Social arc | `social-arc-1.png` … `social-arc-5.png` | Soft blue `#B7E3FF` |
| Mental arc | `mental-arc-1.png` … `mental-arc-5.png` | Soft peach `#FFD1BD` |
| Physical arc | `physical-arc-1.png` … `physical-arc-5.png` | Soft yellow `#FEE188` |
| Overlays | `ring-overlay-full.png`, `ring-empty-state.png`, `ring-frame.png` | — |

Each arc has 5 segments that stack to form a quarter-ring. Segment N is
rendered when the corresponding stat value is ≥ N. The `useHealthBar` hook
computes which segments are "filled" given the current stats object, and the
`HealthBar` component (to be built in `src/components/game/HealthBar.jsx`)
renders them as absolutely-positioned `<img>` layers.

To replace placeholder slots:
1. Drop the final PNGs into `src/assets/health-bar/` with the names above.
2. Update the `src` paths in `useHealthBar.js` to use proper Vite asset
   imports (e.g. `import social1 from '../assets/health-bar/social-arc-1.png'`).

Currently the `.placeholder` files are text stubs — they will be ignored by
the `HealthBar` component until real PNGs are provided.

---

## Design tokens

All design tokens are in `src/styles/tokens.css` as CSS custom properties and
are available globally. Key tokens:

| Token | Value |
|-------|-------|
| `--color-dark-green` | `#5D8E67` |
| `--color-off-white` | `#F9F5ED` |
| `--color-soft-green` | `#9FD89C` |
| `--color-yellow` | `#FEE188` |
| `--color-peach` | `#FFD1BD` |
| `--color-blue` | `#B7E3FF` |
| `--color-ink` | `#3a3a3a` |
| `--font-heading` | Comfortaa |
| `--font-body` | Caveat |
| `--font-emphasis` | Hoefler Text / Georgia |

Use CSS Modules (`.module.css`) or plain CSS files alongside components —
no Tailwind in this project.
