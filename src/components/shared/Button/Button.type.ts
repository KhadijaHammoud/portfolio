/** Visual weight for shared buttons (`TextButton`, `IconButton`, `ButtonLink`). */
export enum ButtonVariant {
  /** Filled accent CTA — one main action per cluster (e.g. “Say hello”, email, CV download). */
  PRIMARY = 'PRIMARY',
  /** Outline pill beside a primary — full `text-ink`, neutral hover (e.g. hero secondary CTA, “View full size”). */
  SECONDARY = 'SECONDARY',
  /** Low-emphasis control — muted at rest, accent border on hover; default for `IconButton` (socials, HUD icons, inline links). */
  GHOST = 'GHOST',
  /** Accent-tinted shell for a standout in-context action (e.g. alignment HUD “Sweep all”). */
  ACCENT = 'ACCENT',
}

export enum ButtonSize {
  MD = 'MD',
  SM = 'SM',
}
