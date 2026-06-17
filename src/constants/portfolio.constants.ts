import type { Experience, WorkProject } from '../types';
import { FULLYRAMPED_SHOTS } from './fullyramped-shots';
import { SKIFF_CALENDAR_SHOTS } from './skiff-calendar-shots';

/** Shared employer / role metadata — single source for Work and Experience. */
const SAN_FRANCISCO_REMOTE = 'San Francisco, CA (Remote)';

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

function toWorkProject(
  core: (typeof ENGAGEMENT_CORE)[keyof typeof ENGAGEMENT_CORE],
  details: Omit<
    WorkProject,
    'slug' | 'company' | 'scope' | 'period' | 'impacts' | 'badges'
  > & {
    slug: string;
    scope: string;
  },
): WorkProject {
  const { slug, scope, ...rest } = details;
  return {
    slug,
    company: core.company,
    scope,
    period: core.start + ' - ' + core.end,
    ...('impacts' in core && core.impacts ? { impacts: core.impacts } : {}),
    ...('badges' in core && core.badges ? { badges: core.badges } : {}),
    ...rest,
  };
}

function toSkiffWorkProject(
  details: Parameters<typeof toWorkProject>[1],
): WorkProject {
  return toWorkProject(ENGAGEMENT_CORE.skiff, details);
}

export const PROFILE = {
  firstName: 'Khadija',
  lastName: 'Hammoud',
  /** Emphasized role in the hero tagline (rendered bold in Hero). */
  heroTaglineRole: 'software engineer',
  /** Rest of the hero tagline after the role. */
  heroTagline: 'who ships polished, zero-to-one products.',
  /** Longer hero detail below the tagline. */
  heroLead:
    'With a strong focus on frontend development, I help teams build scalable, high-performance applications from sketch to production, clean and pixel-perfect. I care about the details most people only feel, like when something needs to go just a little to the left.',
  location: 'Cairo, Egypt',
  openToRemote: 'Open to remote work',
  email: 'kkhammoud@gmail.com',
  github: 'https://github.com/KhadijaHammoud',
  linkedin: 'https://linkedin.com/in/khadijahammoud',
  cv: '/Khadija_Hammoud_CV_2026.pdf',
  cvFileName: 'Khadija_Hammoud_CV_2026.pdf',
  bio: [
    "I'm a frontend-focused engineer based in Cairo, working remotely with teams across the globe to plan, build, and improve great user experiences.",
    'I thrive on turning ideas into intuitive, delightful interfaces, collaborating closely with design and product from the earliest stages.',
    'I care deeply about architecture and performance, but polish is never an afterthought. I like interfaces that feel clean, intentional, and exactly right.',
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
  ProseMirror = 'ProseMirror',
  Yjs = 'Yjs',
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
      Skill.ProseMirror,
      Skill.Yjs,
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
    'Led the engineering revamp that prepared Skiff UI, a React component library, for open-sourcing, turning an internal component library into a polished, public project adopted by the community. Built during my work on the [Skiff](#work-skiff) productivity suite.',
  highlights: [
    'Led engineering on the open-source release of Skiff UI.',
    'Built missing components alongside design to round out the library ahead of release.',
    'Reshaped core components around cleaner APIs and a more intentional developer experience.',
    'Prepared the codebase for the public by cutting internal-only complexity from the library.',
    'Collaborated with design to turn the Skiff UI system into a cohesive, production-ready component set.',
  ],
  stack: [Skill.React, Skill.TypeScript, Skill.StyledComponents],
  stars: '420+',
  url: 'https://github.com/skiff-org/skiff-ui',
};

export const FEATURED_WORK: WorkProject[] = [
  toWorkProject(ENGAGEMENT_CORE.fullyramped, {
    slug: ENGAGEMENT_CORE.fullyramped.slug,
    scope: ENGAGEMENT_CORE.fullyramped.scope,
    title: 'FullyRamped',
    summary:
      'FullyRamped is an AI sales enablement platform where reps practice live calls against AI prospects, review real game tape, and close skill gaps with coaching and analytics.',
    highlights: [
      'Built the customer-facing web app from 0→1 as the founding frontend engineer on a greenfield React/TypeScript codebase.',
      'Integrated real-time audio and video web calls with Daily.co for live AI role-plays.',
      'Implemented real-time AI scoring and coaching for role-plays, with feedback surfaced in the post-call review flow.',
      'Created CRM integration UIs for Gong, Salesloft, and Clari to browse and import calls into practice and review workflows.',
      'Built the simulation designer, a multi-step flow builder for creating and configuring AI prospects.',
      'Developed the sales content library (Knowledge Hub), internal tooling for managing sales content and evaluation templates.',
      'Built a reusable component system that powers layouts, tables, filters, and modals across the product.',
      'Partnered with product on direction from early prototype through launch, shaping core flows and UX decisions.',
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
  toSkiffWorkProject({
    slug: ENGAGEMENT_CORE.skiff.slug,
    scope: ENGAGEMENT_CORE.skiff.scope,
    title: 'Skiff',
    summary:
      'Skiff was a privacy-first productivity suite with Pages, Drive, Mail, and Calendar, built in a React/TypeScript monorepo with zero-knowledge client-side encryption.',
    apps: [
      {
        title: 'Skiff Pages / Drive',
        scope: 'Encrypted collaborative documents & file storage',
        summary:
          'Users create and edit rich-text pages in a ProseMirror-based editor with real-time collaboration (Yjs), organize files in a folder dashboard, share with granular permissions, and export content with document data encrypted end-to-end on the client.',
        highlights: [
          'Worked on rich document editing features, including tables, code blocks, comments, and Markdown/PDF export.',
          'Built the document version history manager, letting users browse snapshots, compare versions, and restore prior document states.',
          'Contributed to the Skiff Drive file dashboard, including folder navigation, sharing permissions, and public link flows.',
          'Contributed to the Skiff Pages and Drive iOS and Android apps, including the native WebView editor integration.',
        ],
      },
      {
        title: 'Skiff Mail',
        scope: 'End-to-end encrypted email client',
        summary:
          'Users read and manage threads in a virtualized inbox, compose rich-text mail with client-side encryption, search locally over decrypted content, and configure aliases, forwarding, filters, and security settings, all without plaintext leaving the browser.',
        highlights: [
          'Contributed to the mail compose and inbox experience, including rich-text editing, thread reading, labels, and bulk actions.',
          'Worked on power-user mail workflows, including keyboard shortcuts, schedule send, and mail import from Gmail and Outlook.',
          'Contributed to the Skiff Mail iOS and Android apps, including mobile-optimized inbox, thread, and settings flows.',
        ],
      },
      {
        title: 'Skiff Calendar',
        scope: 'Local-first encrypted calendar',
        summary:
          'Users view and manage events in weekly and monthly layouts, create and edit recurring events, invite attendees, and sync scheduling over encrypted Skiff Mail (ICS). Events are stored encrypted in IndexedDB and decrypted in a Web Worker, with bidirectional sync to keep devices consistent.',
        highlights: [
          'Built the monthly calendar view, including day cells, event cards, and multi-day event rendering across the grid.',
          'Worked on drag-to-create/resize events, recurring events, attendee management, and reminders.',
          'Fixed timezone handling across the calendar, including ICS parsing, timezone picker UX, and correct day highlighting across timezones.',
          'Improved calendar rendering performance across the monthly and weekly views.',
          'Contributed to the Skiff Calendar iOS and Android apps, including mobile monthly and week views.',
        ],
        shots: SKIFF_CALENDAR_SHOTS,
      },
    ],
    stack: [
      Skill.React,
      Skill.TypeScript,
      Skill.StyledComponents,
      Skill.ApolloClient,
      Skill.GraphQL,
      Skill.ProseMirror,
      Skill.Yjs,
      Skill.E2EEncryption,
    ],
  }),
  toWorkProject(ENGAGEMENT_CORE.loanos, {
    slug: ENGAGEMENT_CORE.loanos.slug,
    scope: ENGAGEMENT_CORE.loanos.scope,
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

export const EDUCATION = [
  {
    school: 'German University in Cairo',
    degree: 'BSc Computer Science & Engineering',
    period: 'Sep 2015 - Jul 2020',
    note: 'GPA 1.09 (A on the German scale 0.7 - 6.0, where 0.7 is highest).',
  },
  {
    school: 'Ulm University',
    degree: 'Machine Learning Intern · Bachelor project',
    period: 'Mar 2019 - Aug 2019',
    note: 'Conducted machine learning research: built and trained a neural network to recognize Arabic Sign Language, then developed an iOS app that integrated the model for real-world sign language recognition.',
  },
];

export const LANGUAGES = [
  { name: 'English', level: 'Bilingual' },
  { name: 'Arabic', level: 'Native' },
];
