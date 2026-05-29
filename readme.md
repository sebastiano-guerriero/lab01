# My Portfolio

I design and code web apps. This portfolio showcases some of my favorite UI experiments.

## CSS

| File | Role |
|------|------|
| `assets/css/tw-input.css` | Tailwind source (`@import`, `@theme`, `@source`, …) |
| `assets/css/tw-output.css` | Compiled Tailwind (auto-generated; commit it) |
| `assets/css/legacy.css` | Existing styles |
| `assets/css/style.css` | Entry in `index.html` — imports `tw-output.css`, then `legacy.css` |

Edit **`tw-input.css`** for Tailwind utilities, or **`legacy.css`** for everything else. `style.css` never changes.

### Commands

```bash
npm install
```

**Local dev** — Tailwind watch + Vite (updates `tw-output.css` as you save; browser reloads):

```bash
npm run dev
```

**Production CSS** — minify/purge `tw-output.css` before deploy:

```bash
npm run build:css
```

If you skip `build:css`, the site still works using the last `tw-output.css` (just not optimized).
