export type EngagementBadge = {
  label: string;
  href?: string;
};

export type WorkShot = {
  src: string;
  alt: string;
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
  highlights: string[];
  stack: string[];
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
