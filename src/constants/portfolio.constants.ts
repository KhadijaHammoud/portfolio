import type { Experience, WorkProject } from '../types';
import { FULLYRAMPED_SHOTS } from './fullyramped-shots';

/** Shared employer / role metadata — single source for Work and Experience. */
const SAN_FRANCISCO_REMOTE = 'San Francisco (Remote)';

const ENGAGEMENT_CORE = {
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
    location: SAN_FRANCISCO_REMOTE,
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

function toWorkProject(
  core: (typeof ENGAGEMENT_CORE)[keyof typeof ENGAGEMENT_CORE],
  details: Omit<
    WorkProject,
    'slug' | 'company' | 'scope' | 'period' | 'impacts' | 'badges'
  >,
): WorkProject {
  return {
    slug: core.slug,
    company: core.company,
    scope: core.scope,
    period: core.start + ' - ' + core.end,
    ...('impacts' in core && core.impacts ? { impacts: core.impacts } : {}),
    ...('badges' in core && core.badges ? { badges: core.badges } : {}),
    ...details,
  };
}

export const PROFILE = {
  firstName: 'Khadija',
  lastName: 'Hammoud',
  /** Emphasized role in the hero tagline (rendered bold in Hero). */
  heroTaglineRole: 'software engineer',
  /** Rest of the hero tagline after the role. */
  heroTagline: 'who ships zero-to-one products.',
  /** Longer hero detail below the tagline. */
  heroLead:
    'With a strong focus on frontend development, I help teams build scalable, high-performance, pixel-perfect applications from sketch to production.',
  location: 'Cairo, Egypt',
  openToRemote: 'Open to remote work',
  email: 'kkhammoud@gmail.com',
  github: 'https://github.com/KhadijaHammoud',
  linkedin: 'https://linkedin.com/in/khadijahammoud',
  cv: '/Khadija_Hammoud_CV_2026.pdf',
  cvFileName: 'Khadija_Hammoud_CV_2026.pdf',
  bio: [
    "I'm a frontend-focused engineer based in Cairo, working remotely with teams across the globe to plan, build, and improve great user experiences.",
    'I thrive on turning ideas into intuitive and delightful interfaces, collaborating closely with both design and product from the earliest stages.',
    'I care deeply about architecture and performance, but my top priority is always delivering features that genuinely make an impact.',
  ],
};

enum Skill {
  TypeScript = 'TypeScript',
  JavaScript = 'JavaScript',
  HTML = 'HTML',
  CSS = 'CSS',
  SCSS = 'SCSS',
  GraphQL = 'GraphQL',
  Python = 'Python',
  Swift = 'Swift',
  Java = 'Java',
  CSharp = 'C#',
  Rust = 'Rust',
  React = 'React',
  Redux = 'Redux',
  RTKQuery = 'RTK Query',
  ApolloClient = 'Apollo Client',
  Node = 'Node.js',
  Express = 'Express',
  Tailwind = 'Tailwind CSS',
  DaisyUI = 'DaisyUI',
  StyledComponents = 'styled-components',
  RadixUI = 'Radix UI',
  FramerMotion = 'Framer Motion',
  Recharts = 'Recharts',
  WebRTC = 'WebRTC (Daily.co)',
  WebSockets = 'WebSockets (Socket.io)',
  Jest = 'Jest',
  Auth0 = 'Auth0',
  RESTAPIs = 'REST APIs',
  PerformanceOptimization = 'Performance Optimization',
  SystemDesign = 'System Design',
  E2EEncryption = 'E2E Encryption',
}

export const SKILLS = [
  {
    group: 'Languages',
    items: [
      Skill.TypeScript,
      Skill.JavaScript,
      Skill.HTML,
      Skill.CSS,
      Skill.SCSS,
      Skill.GraphQL,
      Skill.Python,
      Skill.Swift,
      Skill.Java,
      Skill.CSharp,
      Skill.Rust,
    ],
  },
  {
    group: 'Frameworks & Libraries',
    items: [
      Skill.React,
      Skill.Redux,
      Skill.RTKQuery,
      Skill.ApolloClient,
      Skill.Node,
      Skill.Express,
      Skill.Tailwind,
      Skill.DaisyUI,
      Skill.StyledComponents,
      Skill.RadixUI,
      Skill.FramerMotion,
      Skill.Recharts,
    ],
  },
  {
    group: 'Tools & Practices',
    items: [
      Skill.WebRTC,
      Skill.WebSockets,
      Skill.Jest,
      Skill.Auth0,
      Skill.RESTAPIs,
      Skill.PerformanceOptimization,
      Skill.SystemDesign,
      Skill.E2EEncryption,
    ],
  },
];

export const OPEN_SOURCE = {
  company: ENGAGEMENT_CORE.skiff.company,
  badges: ENGAGEMENT_CORE.skiff.badges,
  impacts: ENGAGEMENT_CORE.skiff.impacts,
  period: `${ENGAGEMENT_CORE.skiff.start} - ${ENGAGEMENT_CORE.skiff.end}`,
  name: 'Skiff UI',
  role: 'Lead Contributor',
  summary:
    'Led the engineering revamp that prepared Skiff UI, a React component library, for open-sourcing, turning an internal component library into a polished, public project adopted by the community.',
  highlights: [
    'Served as a main contributor on the open-source project.',
    'Built and refactored core components, improved public APIs, and enhanced code quality.',
    'Worked closely with design to align every component with the Skiff UI design system.',
    'Shipped foundational features that improved usability, developer experience, and community adoption.',
  ],
  stack: [Skill.React, Skill.TypeScript, Skill.StyledComponents],
  stars: '420+',
  url: 'https://github.com/skiff-org/skiff-ui',
};

export const FEATURED_WORK: WorkProject[] = [
  toWorkProject(ENGAGEMENT_CORE.fullyramped, {
    title: 'FullyRamped',
    summary:
      'FullyRamped helps revenue teams rehearse real conversations before they hit the pipeline — AI role-plays, scored practice calls, and org-wide visibility into who is ready to sell.',
    highlights: [
      'Built the product UI from scratch: simulations library, builder, review, analytics, and settings.',
      'Designed scalable, offline-aware state and data-fetching architecture for enterprise orgs.',
      'Integrated real-time video and audio with AI scoring, coaching rubrics, and synced transcripts.',
      'Developed a reusable component system; partnered with founders, design, and backend on product direction.',
    ],
    stack: [
      Skill.React,
      Skill.TypeScript,
      Skill.Tailwind,
      Skill.DaisyUI,
      Skill.Auth0,
      Skill.Redux,
      Skill.RTKQuery,
      Skill.RadixUI,
      Skill.Recharts,
      Skill.WebRTC,
      Skill.WebSockets,
      Skill.Node,
      Skill.Express,
    ],
    shots: FULLYRAMPED_SHOTS,
  }),
  toWorkProject(ENGAGEMENT_CORE.skiff, {
    title: 'Skiff Pages, Mail, Calendar, and Drive',
    summary:
      'Skiff was a privacy-first productivity suite whose mission was to bring freedom to the internet using the latest in privacy, cryptography, and decentralization technologies.',
    highlights: [
      'Built responsive React features for web and mobile across the productivity suite.',
      'Scaled core product features for millions of users.',
      'Resolved performance bottlenecks and led key architectural improvements.',
      'Led engineering on Skiff UI toward open-source — see the [Open Source](#open-source) section for public design system work.',
    ],
    stack: [
      Skill.React,
      Skill.TypeScript,
      Skill.StyledComponents,
      Skill.ApolloClient,
      Skill.GraphQL,
      Skill.E2EEncryption,
    ],
  }),
  toWorkProject(ENGAGEMENT_CORE.loanos, {
    title: 'LoanOS',
    summary:
      'LoanOS is a blockchain-based platform that automates manual loan processing and trade approvals, reducing settlement times for institutional lenders.',
    highlights: [
      'Built responsive, accessible user interfaces for the platform.',
      'Implemented backend services with typed API contracts.',
      'Authored smart contracts for on-chain loan logic and integrated them into the web application.',
    ],
    stack: [
      Skill.React,
      Skill.TypeScript,
      Skill.SCSS,
      Skill.Redux,
      Skill.Node,
      Skill.Rust,
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
    "Frontend engineer for Skiff's end-to-end encrypted productivity suite. Joined when the product was just Pages, helped build Drive, Mail, and Calendar across web and mobile, and stayed through Skiff's acquisition by Notion in February 2024.",
  ),
  toExperience(
    ENGAGEMENT_CORE.loanos,
    'Full-stack engineer for LoanOS, a loan digitization platform using blockchain-based smart contracts to automate lending workflows.',
  ),
];

/** Full years since earliest role start — e.g. `"5+"` for hero stats. */
export const YEARS_OF_EXPERIENCE = (() => {
  const earliestStart = EXPERIENCES.reduce(
    (earliest, exp) =>
      new Date(exp.start) < new Date(earliest) ? exp.start : earliest,
    EXPERIENCES[0].start,
  );
  const start = new Date(earliestStart);
  const now = new Date();
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  return `${Math.floor(months / 12)}+`;
})();

export const EDUCATION = [
  {
    school: 'German University in Cairo',
    degree: 'BSc Computer Science & Engineering',
    period: 'Sep 2015 – Jul 2020',
    note: 'GPA 1.09 (A on the German scale 0.7 - 6.0, where 0.7 is highest).',
  },
  {
    school: 'Ulm University',
    degree: 'Machine Learning Intern · Bachelor project',
    period: 'Mar 2019 – Aug 2019',
    note: 'Conducted machine learning research: built and trained a neural network to recognize Arabic Sign Language, then developed an iOS app that integrated the model for real-world sign language recognition.',
  },
];

export const LANGUAGES = [
  { name: 'English', level: 'Fluent' },
  { name: 'Arabic', level: 'Native' },
];
