import type { Experience } from '../types';

/** Shared employer / role metadata — single source for Work, Experience, and Open Source. */
const SAN_FRANCISCO_REMOTE = 'San Francisco, CA (Remote)';

export const ENGAGEMENT_CORE = {
  fullyramped: {
    slug: 'fullyramped',
    company: 'FullyRamped',
    scope: 'AI sales training platform',
    role: 'Founding Engineer',
    location: SAN_FRANCISCO_REMOTE,
    start: 'Apr 2024',
    end: 'Present',
    impacts: ['$1M+ ARR', '2,500+ users', '200+ DAU'],
  },
  skiff: {
    slug: 'skiff',
    company: 'Skiff via Nodogoro',
    scope: 'End-to-end encrypted productivity suite',
    badges: [
      {
        label: 'Acquired by Notion',
        href: 'https://www.notion.com/blog/meet-skiff-the-newest-member-of-the-notion-family',
      },
    ],
    role: 'Senior Software Engineer',
    location: SAN_FRANCISCO_REMOTE,
    start: 'Aug 2022',
    end: 'Jan 2024',
    impacts: ['2M+ users'],
  },
  loanos: {
    slug: 'loanos',
    company: 'Forest Park Group via Nodogoro',
    scope: 'Loan digitization platform',
    role: 'Software Engineer',
    location: 'San Mateo, CA (Remote)',
    start: 'Aug 2020',
    end: 'Jul 2022',
  },
} as const;

function toExperience(
  core: (typeof ENGAGEMENT_CORE)[keyof typeof ENGAGEMENT_CORE],
  summary: string,
): Experience {
  return {
    company: core.company,
    role: core.role,
    location: core.location,
    start: core.start,
    end: core.end,
    ...('impacts' in core && core.impacts ? { impacts: core.impacts } : {}),
    ...('badges' in core && core.badges ? { badges: core.badges } : {}),
    summary,
    workSlug: core.slug,
  };
}

export const EXPERIENCES: Experience[] = [
  toExperience(
    ENGAGEMENT_CORE.fullyramped,
    'Founding frontend engineer for an AI sales training platform. Built the complete frontend architecture from zero-to-one; launched the product in just 4 months.',
  ),
  toExperience(
    ENGAGEMENT_CORE.skiff,
    "Frontend engineer for Skiff's end-to-end encrypted productivity suite. Joined when the product was just Pages, helped build Drive, Mail, and Calendar across web and mobile, and stayed through Skiff's acquisition by Notion in February 2024.",
  ),
  toExperience(
    ENGAGEMENT_CORE.loanos,
    'Full-stack engineer for LoanOS, a loan digitization platform using blockchain-based smart contracts to automate lending workflows.',
  ),
];
