export type Experience = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  highlights: string[];
  stack: string[];
  url?: string;
};

export const profile = {
  name: 'Khadija Hammoud',
  title: 'Senior Software Engineer',
  tagline:
    'Frontend engineer building fast, scalable, product-driven web apps.',
  location: 'Cairo, Egypt',
  email: 'kkhammoud@gmail.com',
  phone: '+20 122 890 4320',
  github: 'https://github.com/KhadijaHammoud',
  linkedin: 'https://linkedin.com/in/khadijahammoud',
  bio: [
    "I'm a frontend engineer with 5+ years of experience building scalable, high-performance web applications.",
    'Currently a founding engineer at an AI startup where I lead frontend development — taking products from zero to one, owning architecture, and shipping core features alongside a tight founding team.',
    'I care deeply about system design, performance, and the craft of product engineering in fast-moving environments.',
  ],
};

export const skills: { group: string; items: string[] }[] = [
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

export type OpenSourceProject = {
  name: string;
  tagline: string;
  organization: string;
  role: string;
  summary: string;
  highlights: string[];
  stack: string[];
  stars: string;
  url: string;
};

export const openSource: OpenSourceProject = {
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

export const experiences: Experience[] = [
  {
    company: 'FullyRamped',
    role: 'Founding Engineer, Frontend',
    location: 'San Francisco (Remote)',
    start: 'Apr 2024',
    end: 'Present',
    summary:
      'Leading frontend development for an AI-powered sales training and role-play platform. Owning architecture and core product decisions from zero to one.',
    highlights: [
      'Built the web application from the ground up in a zero-to-one environment.',
      'Designed a scalable, resilient state-management and data-fetching architecture with offline-aware caching.',
      'Integrated real-time video and audio to power interactive AI-driven sales simulations.',
      'Developed a reusable component system to speed up development and keep UI consistent.',
      'Partnered closely with founders, design, and backend teams to shape product direction and deliver high-impact features.',
    ],
    stack: [
      'React',
      'TypeScript',
      'Redux',
      'RTK Query',
      'WebRTC (Daily.co)',
      'WebSockets (Socket.io)',
      'Tailwind CSS',
      'Radix UI',
      'Framer Motion',
      'Recharts',
      'Node.js',
    ],
  },
  {
    company: 'Skiff (acquired by Notion) via Nodogoro',
    role: 'Senior Software Engineer, Frontend',
    location: 'San Francisco (Remote)',
    start: 'Aug 2022',
    end: 'Apr 2024',
    summary:
      'Founding engineer across Skiff Mail, Calendar, Drive, and Pages — an end-to-end encrypted productivity suite built on a complex client-side encryption architecture.',
    highlights: [
      'Built and scaled core product features across the suite, contributing to product adoption and reliability.',
      'Drove architecture decisions and resolved performance bottlenecks across key product areas.',
      'Collaborated closely with design and backend teams to deliver high-quality user experiences.',
    ],
    stack: [
      'React',
      'TypeScript',
      'styled-components',
      'Apollo Client',
      'GraphQL',
      'E2E Encryption',
    ],
  },
  {
    company: 'Forest Park Group via Nodogoro',
    role: 'Software Engineer',
    location: 'San Francisco (Remote)',
    start: 'Aug 2020',
    end: 'Jul 2022',
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
  },
];

export const education = [
  {
    school: 'German University in Cairo',
    degree: 'BSc Computer Science & Engineering',
    period: '2015 – 2020',
    note: 'GPA 1.09 (A equivalent — German 1.0–5.0 scale, where 1.0 is highest).',
  },
];

export const languages = [
  { name: 'English', level: 'Fluent' },
  { name: 'Arabic', level: 'Native' },
];
