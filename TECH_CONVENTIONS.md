# Portfolio — Tech Conventions

**Last updated:** June 2026

Project-wide reference for how this portfolio is structured, how we name things, and how we ship changes. Cursor rules in `.cursor/rules/` mirror the essentials for day-to-day development.

---

## Table of contents

1. [Repository layout](#1-repository-layout)
2. [General development principles](#2-general-development-principles)
3. [Git and pull requests](#3-git-and-pull-requests)
4. [Source layout](#4-source-layout)
5. [TypeScript](#5-typescript)
6. [Components and styling](#6-components-and-styling)
7. [Content and constants](#7-content-and-constants)
8. [Animations](#8-animations)
9. [Tooling and quality gates](#9-tooling-and-quality-gates)

---

## 1. Repository layout

| Path                     | Role                                                     |
| ------------------------ | -------------------------------------------------------- |
| `src/components/`        | Section and UI components                                |
| `src/components/shared/` | Reusable buttons and primitives                          |
| `src/hooks/`             | Shared React hooks                                       |
| `src/alignment/`         | Alignment mini-game — components, context, feature hooks |
| `src/motion/`            | Shared Framer Motion helpers                             |
| `src/components/icons/`  | Brand / social icons                                     |
| `src/constants/`         | Portfolio copy, experience, education, skills            |
| `src/theme/`             | Theme provider and light/dark behavior                   |
| `src/utils/`             | Cross-cutting utilities used in multiple places          |
| `public/`                | Static assets, `index.html`, manifest                    |
| `.cursor/rules/`         | Cursor agent guidance                                    |

**Stack:** React 19, TypeScript, Create React App, Tailwind CSS, Framer Motion, lucide-react, simple-icons.

---

## 2. General development principles

### Planning and scope

- Propose the approach before large implementations; split work into ordered steps.
- Implement only what was asked; avoid drive-by refactors or speculative features.
- Prefer **small, incremental diffs** over large batches.
- When requirements are unclear, **ask** rather than assume.

### Code style

- **Match surrounding code** — naming, file layout, export style, animation patterns.
- **Single responsibility** — one concern per component or module.
- **Extract helpers** when logic repeats; avoid one-off abstractions used once.
- **Single-use helpers** belong in the consuming file or the parent feature folder — not `src/utils/`.
- **Comments** explain non-obvious behavior—not restatements of the code. Avoid ticket- or prompt-specific noise in comments.
- **No `console.log`** in committed code.

### Testing

- No routine automated test suite for this project. Rely on `npm run build`, manual QA in the browser, and visual review.
- Do not add broad test suites unless explicitly requested.

---

## 3. Git and pull requests

### Branches

- Feature work branches from `main` unless another release train is in use.

### Commit messages

Use a short prefix and description when helpful:

```
copy: update hero tagline to fast, polished
feat: add Ulm University bachelor project to education
fix: prevent horizontal scroll on mobile
```

Prefer **why** over **what** in the body when needed. Do not commit secrets or local env files.

### Pull requests

- Summarize behavior change and risk; include a short **test plan** (e.g. desktop + mobile, light + dark theme).
- Ensure `npm run build` passes before merge.

---

## 4. Source layout

```
src/
├── alignment/            # Alignment mini-game (desktop md+)
├── components/           # Section components (Hero, About, Experience, …)
│   ├── shared/           # TextButton, IconButton, ButtonGroup, barrel index
│   └── icons/            # SVG / icon components
├── constants/            # portfolio.const.ts — all site copy & data
├── hooks/                # Shared hooks (useMinMd, …)
├── motion/               # Shared motion helpers (settle, …)
├── theme/                # ThemeProvider
├── utils/                # Shared utilities (cn) — not single-use helpers
├── App.tsx               # Page composition
├── index.css             # Global styles, CSS variables, utilities (.card)
└── index.tsx             # Entry
```

### Section components

- Each major page block is a component (`Hero`, `Experience`, `Education`, …).
- **One React component per file.** Split subcomponents into the same folder as the parent (e.g. `Hero/HeroStatsPanel.tsx`, `AlignHud/AlignHudHintCard.tsx`).
- Use the shared `Section` wrapper for consistent eyebrow, title, and `id` anchors (navbar hash links).
- Compose `App.tsx` from sections only—keep routing-free unless the app grows.

### Hooks and helpers

- **`src/hooks/`** — hooks reused across features (e.g. `useMinMd` for Tailwind `md` breakpoint).
- **Feature hooks** stay with their feature when not shared (e.g. `useAlignable` in `src/alignment/`).
- **Do not** add a standalone util file for logic used in only one place — keep it in that module or co-locate private helpers in the parent feature folder.
- **`src/utils/`** — utilities used across multiple unrelated modules (e.g. `cn`).

### Shared components

- Reuse `src/components/shared/` before adding new button or control variants.
- Use **`ButtonGroup`** to lay out related actions with consistent spacing.
- **`TextButton`** — labeled actions (primary/secondary/ghost/accent); supports optional `href`, `onClick`, and icon.
- **`IconButton`** — icon-only controls with tooltip label; use for compact HUD/toolbar actions.
- Export shared pieces from `src/components/shared/index.ts`.

---

## 5. TypeScript

- **Avoid `any`.** Use interfaces for props; `interface` for object shapes; `type` for unions.
- Prop interfaces: `ComponentNameProps` (or inline `type` for small local components).
- Enums: `PascalCase` members (`ButtonVariant.PRIMARY`).
- Module-level data constants: **SCREAMING_SNAKE_CASE** (`PROFILE`, `EXPERIENCES`, `EDUCATION`).
- **File suffixes:** utilities → `*.util.ts`, constants → `*.const.ts`, shared types → `*.type.ts`.

### Components

- Prefer **named exports** for section and shared components.
- `App.tsx` may use a default export as the CRA entry pattern.
- Match existing style in each file (`React.FC` vs function declarations)—do not mix styles within one file.
- **Props:** required props first, then optional — each group in **alphabetical** order. Apply the same order in `type`/`interface` definitions, destructuring, and JSX.
- **Exports:** only export symbols consumed outside the module. Do not re-export from barrel files unless consumers import them from that barrel.

### Alignment mini-game

- Desktop-only (`md` / 768px+): gate with `useMinMd()` from `src/hooks/`.
- Cards register via `useAlignable`; chips register inside `AlignChipField` groups.
- HUD controls live in `AlignHud/`; celebration uses `celebrationEpoch` in `AlignmentContext` for reliable sparkles on manual complete.

### Imports

Order: external → internal → relative → assets. Prefer barrel imports from `components/shared` when available.

---

## 6. Components and styling

### Tailwind and theme

- **Primary:** Tailwind utility classes with design tokens from `tailwind.config.js` (`bg`, `ink`, `accent`, `secondary`, `line`, …).
- **Theme:** CSS variables in `index.css`; dark mode via `class` on `html` (`ThemeProvider`).
- **Utilities:** Use existing patterns (e.g. `.card`) before inventing new layout wrappers.
- **Avoid** custom CSS unless necessary; keep one-off styles in the component’s `className`.

### Semantic colors

```tsx
className = 'text-ink bg-bg';
className = 'text-ink-muted border-line/10';
className = 'bg-accent text-white'; // primary — CTAs, links, nav
className = 'text-secondary bg-secondary/20'; // ambient — paws, spotlight, blurs
```

**Color roles:** `accent` (terracotta) is primary UI; `secondary` (ginger sand) is decorative motion/background only — do not use `secondary` for buttons or nav active states.

### Icons

- **UI chrome:** `lucide-react`
- **Brand logos:** `@icons-pack/react-simple-icons` or dedicated components under `components/icons/`

### Performance

- `useCallback` / `useMemo` only when passing callbacks to memoized children or doing clearly expensive work—not by default.

---

## 7. Content and constants

All portfolio copy and structured data are split by feature:

- **`src/constants/portfolio.const.ts`** — shared `PROFILE`, `ENGAGEMENT_CORE`, and `Skill`
- **`src/constants/experience.const.ts`** — `EXPERIENCES` timeline
- **Feature folders** — section-specific copy in co-located `*.const.ts` files (e.g. `Work/work.const.ts`, `About/about.const.ts`)

- `PROFILE`, `EXPERIENCES`, `ENGAGEMENT_CORE`, `Skill` — in `src/constants/`
- Section copy — co-located `*.const.ts` in each feature folder (`hero.const.ts`, `work.const.ts`, …)

**Rules:**

- Do not hardcode long copy inside section components—import from constants.
- Keep dates, employers, and bullet highlights in the constant objects so content updates stay in one place.
- Hero may use `PROFILE.name` for dynamic bits; static marketing lines can live in JSX when they are layout-specific.

---

## 8. Animations

- **Framer Motion** for section entrance and hero stagger (`motion.*`, shared variants like `FADE_UP`).
- Prefer `whileInView` with `viewport={{ once: true }}` for scroll reveals.
- Respect `prefers-reduced-motion` where animations are added or extended (match `BackgroundPawPrints` / existing patterns).

---

## 9. Tooling and quality gates

| Command                | Purpose                                                  |
| ---------------------- | -------------------------------------------------------- |
| `npm start`            | Local dev server (port 3000)                             |
| `npm run build`        | Production build — **must pass before merge**            |
| `npm test`             | CRA test runner (optional; not part of routine workflow) |
| `npm run format`       | Format `src/` with Prettier                              |
| `npm run format:check` | Check formatting without writing                         |

- **Prettier:** `.prettierrc.json` — single quotes, trailing commas, 80 print width.
- **ESLint:** CRA defaults via `package.json` `eslintConfig`.
- Run Prettier on touched files before committing.

### When adding a feature (checklist)

- [ ] Copy/data in the feature’s `*.const.ts` (or `portfolio.const.ts` / `experience.const.ts` when shared)
- [ ] Section uses `Section` + navbar `id` if it is a new anchor
- [ ] Shared UI reused from `components/shared/`
- [ ] Light and dark theme checked
- [ ] `npm run build` passes
- [ ] No `console.log` left behind

---

## Related documents

| Document                 | Contents                            |
| ------------------------ | ----------------------------------- |
| [README.md](./README.md) | Local dev and scripts               |
| `.cursor/rules/*.mdc`    | Agent-focused summaries of this doc |

If conventions conflict, **prefer the more specific rule** in `.cursor/rules/` for the area you are editing, and update this file when team standards change.
