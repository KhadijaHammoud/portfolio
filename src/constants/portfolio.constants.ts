import { FULLYRAMPED_SHOTS } from './fullyramped-shots';

export const NOTION_SKIFF_ACQUISITION_URL =
  'https://www.notion.com/blog/meet-skiff-the-newest-member-of-the-notion-family';

export type EngagementBadge = {
  label: string;
  href?: string;
};

export type WorkShot = {
  src: string;
  alt: string;
  caption: string;
};

export type WorkProject = {
  slug: string;
  company: string;
  title: string;
  role: string;
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

/** Shared employer / role metadata — single source for Work and Experience. */
const SAN_FRANCISCO_REMOTE = 'San Francisco (Remote)';

const ENGAGEMENT_CORE = {
  fullyramped: {
    slug: 'fullyramped',
    company: 'FullyRamped',
    role: 'Founding Engineer',
    location: SAN_FRANCISCO_REMOTE,
    start: 'Apr 2024',
    end: 'Present',
    period: '2024 — Present',
    impacts: ['$1M+ ARR', '2,500+ users', '200+ DAU'],
  },
  skiff: {
    slug: 'skiff',
    company: 'Skiff via Nodogoro',
    badges: [
      {
        label: 'Acquired by Notion',
        href: NOTION_SKIFF_ACQUISITION_URL,
      },
    ],
    role: 'Senior Software Engineer',
    location: SAN_FRANCISCO_REMOTE,
    start: 'Aug 2022',
    end: 'Apr 2024',
    period: 'Aug 2022 — Apr 2024',
    impacts: ['2M+ users'],
  },
  loanos: {
    slug: 'loanos',
    company: 'Forest Park Group via Nodogoro',
    role: 'Software Engineer',
    location: SAN_FRANCISCO_REMOTE,
    start: 'Aug 2020',
    end: 'Jul 2022',
    period: 'Aug 2020 — Jul 2022',
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

function toWorkProject(
  core: (typeof ENGAGEMENT_CORE)[keyof typeof ENGAGEMENT_CORE],
  details: Omit<
    WorkProject,
    'slug' | 'company' | 'role' | 'period' | 'impacts' | 'badges'
  >,
): WorkProject {
  return {
    slug: core.slug,
    company: core.company,
    role: core.role,
    period: core.period,
    ...('impacts' in core && core.impacts ? { impacts: core.impacts } : {}),
    ...('badges' in core && core.badges ? { badges: core.badges } : {}),
    ...details,
  };
}

export const PROFILE = {
  name: 'Khadija Hammoud',
  title: 'Senior Software Engineer',
  tagline:
    'Frontend engineer building fast, scalable, product-driven web apps — polished to the last pixel.',
  location: 'Cairo, Egypt',
  openToRemote: 'Open to remote work',
  email: 'kkhammoud@gmail.com',
  phone: '+20 122 890 4320',
  github: 'https://github.com/KhadijaHammoud',
  linkedin: 'https://linkedin.com/in/khadijahammoud',
  cv: '/Khadija_Hammoud_CV_2026.pdf',
  cvFileName: 'Khadija_Hammoud_CV_2026.pdf',
  bio: [
    "I'm a frontend engineer with 5+ years of experience building scalable, high-performance, pixel-perfect web applications.",
    'Currently a founding engineer at an AI startup where I lead frontend development — taking products from zero to one, owning architecture, and shipping core features alongside a tight founding team.',
    'I care deeply about system design, performance, and the craft of product engineering in fast-moving environments.',
    'Above all, I obsess over the details that make a product feel truly polished without letting any of it slow down shipping velocity.',
  ],
};

export const SKILLS = [
  {
    group: 'Languages',
    items: [
      'TypeScript',
      'JavaScript',
      'HTML',
      'CSS',
      'SCSS',
      'GraphQL',
      'Python',
      'Swift',
      'Java',
      'C#',
    ],
  },
  {
    group: 'Frameworks & Libraries',
    items: [
      'React',
      'Redux',
      'Redux Toolkit (RTK Query)',
      'Apollo Client',
      'Node.js',
      'Tailwind CSS',
      'styled-components',
      'Radix UI',
      'Framer Motion',
      'Recharts',
    ],
  },
  {
    group: 'Tools & Practices',
    items: [
      'WebRTC (Daily.co)',
      'WebSockets (Socket.io)',
      'Jest',
      'Auth0',
      'REST APIs',
      'Performance Optimization',
      'System Design',
    ],
  },
];

export const OPEN_SOURCE = {
  name: 'Skiff UI',
  tagline: 'React component library · Skiff Design System',
  organization: 'Skiff',
  role: 'Lead Contributor',
  summary:
    'Led the engineering revamp that prepared Skiff UI for open-sourcing — turning an internal component library into a polished, public project adopted by the community.',
  highlights: [
    'Spearheaded the revamp of Skiff UI in preparation for open-sourcing — overhauling core components, public APIs, and code quality.',
    'Served as a main contributor and maintainer of the open-source project after release.',
    'Partnered closely with design to align every component with the Skiff UI design system.',
    'Shipped foundational features that raised usability, developer experience, and community adoption.',
  ],
  stack: ['React', 'TypeScript', 'styled-components'],
  stars: '420+',
  url: 'https://github.com/skiff-org/skiff-ui',
};

export const FEATURED_WORK: WorkProject[] = [
  toWorkProject(ENGAGEMENT_CORE.fullyramped, {
    title: 'AI sales training platform',
    summary:
      'Zero-to-one web app for AI-powered sales simulations — library navigation, scenario builder, live practice review, analytics, and org admin at enterprise scale.',
    highlights: [
      'Built the product UI from scratch: simulations library, builder, review, analytics, and settings.',
      'Designed scalable, offline-aware state and data-fetching architecture for enterprise orgs.',
      'Integrated real-time video and audio with AI scoring, coaching rubrics, and synced transcripts.',
      'Developed a reusable component system; partnered with founders, design, and backend on product direction.',
    ],
    stack: [
      'React',
      'TypeScript',
      'Redux',
      'RTK Query',
      'WebRTC',
      'WebSockets',
      'Radix UI',
      'Recharts',
    ],
    shots: FULLYRAMPED_SHOTS,
  }),
  toWorkProject(ENGAGEMENT_CORE.skiff, {
    title: 'End-to-end encrypted productivity suite',
    summary:
      'Product engineer across Skiff Mail, Calendar, Drive, and Pages — end-to-end encrypted suite acquired by Notion in early 2024; I stayed through the transition.',
    highlights: [
      'Built responsive React experiences for web and mobile across the productivity suite.',
      'Shipped and scaled core product features, contributing to adoption across millions of users.',
      'Drove architecture decisions and resolved performance bottlenecks across key product areas.',
      'Led engineering on Skiff UI toward open source — see Open Source for the public design system work.',
    ],
    stack: [
      'React',
      'TypeScript',
      'styled-components',
      'Apollo Client',
      'GraphQL',
      'E2E Encryption',
    ],
  }),
  toWorkProject(ENGAGEMENT_CORE.loanos, {
    title: 'LoanOS loan digitization platform',
    summary:
      'Developed full-stack features for LoanOS, a loan digitization platform using blockchain-based smart contracts to automate lending workflows.',
    highlights: [
      'Built responsive, accessible user interfaces for the platform.',
      'Implemented backend services with typed API contracts.',
      'Authored smart contracts for on-chain loan logic and integrated them into the web application.',
    ],
    stack: [
      'React',
      'TypeScript',
      'SCSS',
      'Redux',
      'Node.js',
      'Rust',
      'Blockchain',
    ],
  }),
];

export const EXPERIENCES: Experience[] = [
  toExperience(
    ENGAGEMENT_CORE.fullyramped,
    'Founding frontend engineer for an AI sales training platform. Built the complete frontend architecture from zero-to-one; launched the product in just 4 months.',
  ),
  toExperience(
    ENGAGEMENT_CORE.skiff,
    "Frontend engineer for Skiff's end-to-end encrypted productivity suite. Joined when the product was just Pages, helped build Drive, Mail, and Calendar across web and mobile, and stayed through Skiff's acquisition by Notion in early 2024.",
  ),
  toExperience(
    ENGAGEMENT_CORE.loanos,
    'Full-stack engineer for LoanOS, a loan digitization platform using blockchain-based smart contracts to automate lending workflows.',
  ),
];

export const EDUCATION = [
  {
    school: 'German University in Cairo',
    degree: 'BSc Computer Science & Engineering',
    period: '2015 – 2020',
    note: 'GPA 1.09 (A equivalent — German 1.0–5.0 scale, where 1.0 is highest).',
  },
  {
    school: 'Ulm University',
    degree: 'Machine Learning Intern · Bachelor project',
    period: 'Mar 2019 – Aug 2019 · Ulm, Germany',
    note: 'Conducted machine learning research: built and trained a neural network to recognize Arabic Sign Language, then developed an iOS app that integrated the model for real-world sign language recognition.',
  },
];

export const LANGUAGES = [
  { name: 'English', level: 'Fluent' },
  { name: 'Arabic', level: 'Native' },
];
