export type EngagementBadge = {
  label: string;
  href?: string;
};

export enum Skill {
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
