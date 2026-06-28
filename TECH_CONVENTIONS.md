# Portfolio — Tech Conventions

**Last updated:** June 2026

How this portfolio is structured, named, and shipped. Keep changes small and match existing patterns.

**Stack:** React 19, TypeScript, Create React App, Tailwind CSS, Framer Motion, lucide-react, simple-icons.

---

## Development

- Propose the approach before large work; implement only what was asked.
- Match surrounding code — naming, exports, animation patterns.
- One concern per module; extract helpers when logic repeats.
- Single-use helpers stay with their owner — do not promote to shared utils.
- Comments explain non-obvious behavior only. No `console.log` in committed code.
- No routine automated tests. Verify with `npm run build` and manual browser QA.

---

## Git

- Branch from `main` for feature work.
- Commits: short prefix + description (`feat:`, `fix:`, `copy:`). Prefer why over what.
- PRs: summarize behavior change, include a test plan (desktop + mobile, light + dark).
- `npm run build` must pass before merge. Do not commit secrets.

---

## Layout

**Top-level areas:** sections and shared UI, alignment mini-game, shared constants, app-level contexts, shared hooks, motion helpers, cross-feature types, shared utils.

**Colocate** contexts, hooks, utils, constants, and types with their owning feature or component. Promote to a top-level folder only when reused across unrelated features, or when a provider mounts at the app root.

**Sections:** one component per file; subcomponents live in the same folder. Use the shared section wrapper for eyebrow, title, and anchor ids. Keep the app entry as composition only.

**Shared UI:** reuse existing buttons and controls before adding variants. Group related actions with the shared button group. Export shared pieces from the shared barrel.

**Contexts:** split each into context (types + hook) and provider (state/effects). App-root providers live in the contexts folder; feature-only contexts stay with that feature.

---

## TypeScript

- No `any`. Props interfaces named `ComponentNameProps`.
- Fixed-choice inputs (props, params, stored values) → **enum**, not string unions. Members `PascalCase`; string values match runtime usage.
- Cross-feature enums and types → top-level types folder. Component-specific types stay in that component folder.
- Data constants: `SCREAMING_SNAKE_CASE`. Suffixes: `*.util.ts`, `*.const.ts`, `*.type.ts`.
- Named exports for components. Match export style already used in each file.
- **Props order:** required → optional; vars → callbacks; alphabetical within each group (types, destructuring, JSX, context values).
- Only export symbols used outside the module.

---

## Styling

- Tailwind + semantic tokens (`ink`, `bg`, `accent`, `secondary`, `line`).
- `accent` = primary UI (CTAs, links, nav). `secondary` = decorative only — not buttons or nav.
- Dark mode via class on `html` through the theme provider.
- Prefer existing utilities (e.g. `.card`) over new global CSS.
- UI icons: lucide-react. Brand icons: simple-icons or dedicated icon components.

---

## Content

- Portfolio copy and structured data live in constants — not hardcoded in components.
- Shared profile, experience, and skills data in the constants folder; section copy in co-located constant files per feature.

---

## Alignment mini-game

- Desktop only (768px+); gate with the shared min-width hook.
- Cards register via the alignable hook; chips register inside chip-field groups.
- Manual complete triggers celebration via the alignment context epoch.

---

## Motion

- Framer Motion for section entrance and hero stagger.
- Scroll reveals: `whileInView` with `once: true`.
- Respect `prefers-reduced-motion` when adding animations.

---

## Tooling

| Command                | Purpose                          |
| ---------------------- | -------------------------------- |
| `npm start`            | Dev server                       |
| `npm run build`        | Production build — gate for merge |
| `npm run format`       | Prettier on source               |
| `npm run format:check` | Check formatting                 |

Prettier: single quotes, trailing commas, 80 print width. Format touched files before commit.

### New feature checklist

- [ ] Copy/data in constants (shared or feature-local)
- [ ] Section wrapper + anchor id; navbar link if needed
- [ ] Shared UI reused; light + dark checked
- [ ] `npm run build` passes
- [ ] No `console.log`
