export type EngagementBadge = {
  label: string;
  href?: string;
};

export type WorkShot = {
  src: string;
  alt: string;
  caption?: string;
  variant?: 'mobile';
};

/** Product area within a multi-app work card (e.g. Skiff Mail). */
type WorkAppSection = {
  title: string;
  scope: string;
  summary?: string;
  highlights: string[];
  shots?: readonly WorkShot[];
};

export type WorkProject = {
  slug: string;
  company: string;
  scope: string;
  title: string;
  period: string;
  impacts?: readonly string[];
  /** Short contextual labels (e.g. acquisition); optional link per badge. */
  badges?: readonly EngagementBadge[];
  summary: string;
  /** Flat bullets for single-product cards. */
  highlights?: string[];
  /** Grouped bullets when one employer card covers multiple apps. */
  apps?: readonly WorkAppSection[];
  /** Omit when highlights and the Skills section already cover the stack. */
  stack?: string[];
  shots?: readonly WorkShot[];
};

export type Experience = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  impacts?: readonly string[];
  badges?: readonly EngagementBadge[];
  summary: string;
  workSlug: string;
};
