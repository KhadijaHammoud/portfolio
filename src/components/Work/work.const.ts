import { ENGAGEMENT_CORE } from '../../constants';
import { Skill, type WorkProject } from '../../types';

/** Curated FullyRamped product screenshots for the Work carousel. */
const FULLYRAMPED_SHOTS = [
  {
    src: '/featured/fullyramped/create-simulation-modal-screenshot.png',
    alt: 'Choose how to build',
    caption:
      'Start from scratch, generate with AI, or create an AI Twin from a real sales call.',
  },
  {
    src: '/featured/fullyramped/simulation-builder-scenario-screenshot.png',
    alt: 'Shape the conversation',
    caption:
      'Configure priorities, objections, and questions, with reusable Knowledge Hub snippets on the side.',
  },
  {
    src: '/featured/fullyramped/simulations-library-with-open-sim-screenshot.png',
    alt: 'Browse and launch',
    caption:
      'Folder-based library to find simulations, preview goals and scorecards, and start a role-play.',
  },
  {
    src: '/featured/fullyramped/post-call-processing-screenshot.png',
    alt: 'Review & improve',
    caption:
      'Post-call AI scorecards and coaching feedback with call metrics and playback.',
  },
  {
    src: '/featured/fullyramped/analytics-leaderboard-screenshot.png',
    alt: 'Track team progress',
    caption:
      'Leaderboard and filters to compare rep performance across simulations and talk time.',
  },
  {
    src: '/featured/fullyramped/integrations-screenshot.png',
    alt: 'Connect your stack',
    caption:
      'Integrations with Gong, Salesloft, and Clari to bring real calls into training workflows.',
  },
  {
    src: '/featured/fullyramped/people-management-screenshot.png',
    alt: 'Scale across the org',
    caption:
      'Admin tooling to invite users, assign teams, and manage access for hundreds of reps.',
  },
] as const;

/** Curated Skiff Calendar screenshots — web and mobile. */
const SKIFF_CALENDAR_SHOTS = [
  {
    src: '/featured/skiff/web/Screenshot%202024-01-24%20at%205.08.41%20PM.png',
    alt: 'Monthly calendar (web)',
    caption:
      'Full monthly grid with multi-day events, recurring schedules, and overflow indicators for dense weeks.',
  },
  {
    src: '/featured/skiff/web/Screenshot%202023-09-03%20at%207.00.00%20PM.png',
    alt: 'Multi-day event rendering (web)',
    caption:
      'Multi-day event bars spanning week boundaries, with collapsed overflow for stacked entries.',
  },
  {
    src: '/featured/skiff/web/Screenshot%202024-01-24%20at%205.09.45%20PM.png',
    alt: 'Day detail popover (web)',
    caption:
      'Day-level popover surfacing recurring rules, multi-day spans, and quick create from the month grid.',
  },
  {
    src: '/featured/skiff/web/Screenshot%202024-01-24%20at%205.10.42%20PM.png',
    alt: 'Timezone-aware scheduling (web)',
    caption:
      'Monthly view with cross-timezone recurring events and a day panel for regional scheduling edge cases.',
  },
  {
    src: '/featured/skiff/web/Screenshot%202024-01-24%20at%205.11.07%20PM.png',
    alt: 'Event composer (web)',
    caption:
      'Inline event composer with attendees, conferencing, reminders, and recurrence without leaving the calendar.',
  },
  {
    src: '/featured/skiff/mobile/Screenshot%202024-01-24%20at%205.12.56%20PM.png',
    alt: 'Monthly calendar (mobile)',
    caption:
      'Mobile month view with compact event chips, overflow counts, and one-tap navigation to today.',
    mobile: true,
  },
  {
    src: '/featured/skiff/mobile/Screenshot%202024-01-24%20at%205.13.43%20PM.png',
    alt: 'Create event (mobile)',
    caption:
      'Bottom-sheet event creation with all-day toggle, conferencing, and push/email reminders.',
    mobile: true,
  },
  {
    src: '/featured/skiff/mobile/Screenshot%202024-01-24%20at%205.14.00%20PM.png',
    alt: 'Recurring events on mobile',
    caption:
      'Touch-optimized month grid carrying the same recurring-event density as the web client.',
    mobile: true,
  },
  {
    src: '/featured/skiff/mobile/Screenshot%202024-01-24%20at%205.14.54%20PM.png',
    alt: 'Day timeline (mobile)',
    caption:
      'Combined month picker and day timeline for drilling into hourly schedules on mobile.',
    mobile: true,
  },
] as const;

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
  toWorkProject(ENGAGEMENT_CORE.skiff, {
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
