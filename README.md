# Portfolio

Personal portfolio site — React, TypeScript, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). The dev server reloads on save.

## Scripts

| Script                 | Description                                       |
| ---------------------- | ------------------------------------------------- |
| `npm start`            | Development server                                |
| `npm run build`        | Production build to `build/` — run before merging |
| `npm test`             | CRA test runner (optional)                        |
| `npm run format`       | Format source with Prettier                       |
| `npm run format:check` | Verify formatting                                 |

## Conventions

See **[TECH_CONVENTIONS.md](./TECH_CONVENTIONS.md)** for:

- Directory layout and component patterns
- Where portfolio copy and data live (`src/constants/portfolio.const.ts`)
- TypeScript, styling, and animation standards
- Git commit and PR expectations

Cursor agents load summarized rules from `.cursor/rules/`.

## Project structure

```
src/
├── features/
│   ├── alignment/  # Crooked-card mini-game (desktop md+)
│   └── ambient/    # Background paw-print animation
├── components/     # Sections + shared UI
├── constants/      # Shared copy and structured data
├── contexts/       # App-level providers (theme, alignment shell)
├── hooks/          # Shared hooks
├── motion/         # Shared motion helpers
├── types/          # Cross-feature enums and types
├── utils/          # Shared utilities
├── App.tsx
└── index.css       # Theme variables, utilities, game styles
```

### Alignment mini-game

On viewports `md` and up, section cards and skill chips start slightly crooked. Visitors drag cards into place and hover chips to straighten them. Game state lives under features and contexts; sections wire it up via `AlignableCard`, `AlignChipField`, and `SkillChip`.

Inspired by [_A Little to the Left_](https://www.alittletotheleft.com/) — not affiliated.

## Deploy

`npm run build` produces static assets in `build/` suitable for hosts such as Vercel or Netlify.
