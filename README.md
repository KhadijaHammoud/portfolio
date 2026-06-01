# Portfolio

Personal portfolio site — React, TypeScript, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). The dev server reloads on save.

## Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Development server |
| `npm run build` | Production build to `build/` — run before merging |
| `npm test` | CRA test runner (optional) |
| `npm run format` | Format source with Prettier |
| `npm run format:check` | Verify formatting |

## Conventions

See **[TECH_CONVENTIONS.md](./TECH_CONVENTIONS.md)** for:

- Directory layout and component patterns
- Where portfolio copy and data live (`src/constants/portfolio.constants.ts`)
- TypeScript, styling, and animation standards
- Git commit and PR expectations

Cursor agents load summarized rules from `.cursor/rules/`.

## Project structure

```
src/
├── components/     # Sections + shared UI
├── constants/      # Site copy and structured data
├── theme/          # Light/dark theme
├── App.tsx
└── index.css       # Theme variables and utilities
```

## Deploy

`npm run build` produces static assets in `build/` suitable for hosts such as Vercel or Netlify.
