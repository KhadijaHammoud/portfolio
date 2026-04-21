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
  name: "Khadija Hammoud",
  title: "Senior Software Engineer",
  tagline: "Frontend engineer building fast, scalable, product-driven web apps.",
  location: "Cairo, Egypt",
  email: "kkhammoud@gmail.com",
  phone: "+20 122 890 4320",
  github: "https://github.com/KhadijaHammoud",
  linkedin: "https://linkedin.com/in/khadijahammoud",
  bio: [
    "I'm a frontend engineer with 5+ years of experience building scalable, high-performance web applications.",
    "Currently a founding engineer at an AI startup where I lead frontend development — taking products from zero to one, owning architecture, and shipping core features alongside a tight founding team.",
    "I care deeply about system design, performance, and the craft of product engineering in fast-moving environments.",
  ],
};

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript", "HTML", "CSS", "GraphQL", "Python", "Swift", "Java", "C#"],
  },
  {
    group: "Frameworks & Libraries",
    items: [
      "React",
      "Redux",
      "Redux Toolkit (RTK Query)",
      "Apollo Client",
      "Node.js",
      "Tailwind CSS",
      "Radix UI",
      "Framer Motion",
      "Recharts",
    ],
  },
  {
    group: "Tools & Practices",
    items: [
      "WebRTC (Daily.co)",
      "WebSockets (Socket.io)",
      "Jest",
      "Auth0",
      "REST APIs",
      "Performance Optimization",
      "System Design",
    ],
  },
];

export const experiences: Experience[] = [
  {
    company: "FullyRamped",
    role: "Founding Engineer, Frontend",
    location: "San Francisco (Remote)",
    start: "Apr 2024",
    end: "Present",
    summary:
      "Leading frontend development for an AI-powered sales training and role-play platform. Owning architecture and core product decisions from zero to one.",
    highlights: [
      "Built the web application from the ground up using React and TypeScript in a zero-to-one environment.",
      "Designed scalable state management and data-fetching architecture with RTK Query and Redux Persist.",
      "Integrated real-time video and audio using Daily.co (WebRTC) to power interactive AI-driven sales simulations.",
      "Developed a reusable component system with Tailwind CSS, Radix UI, and DaisyUI to speed up development and keep UI consistent.",
      "Partnered closely with founders, design, and backend teams to shape product direction and deliver high-impact features.",
    ],
    stack: ["React", "TypeScript", "RTK Query", "Tailwind", "Radix UI", "Daily.co"],
  },
  {
    company: "Skiff (acquired by Notion)",
    role: "Senior Software Engineer, Frontend",
    location: "via Nodogoro",
    start: "Aug 2022",
    end: "Apr 2024",
    summary:
      "Founding engineer across Skiff Mail, Calendar, Drive, and Pages — an end-to-end encrypted productivity suite built on a complex client-side encryption architecture.",
    highlights: [
      "Built and scaled core product features using React, Redux, and CSS, contributing to product adoption and reliability.",
      "Led the engineering revamp and open-source release of Skiff UI, a React component library (420+ GitHub stars).",
      "Drove architecture decisions and resolved performance bottlenecks across key product areas.",
      "Collaborated closely with design and backend teams to deliver high-quality user experiences.",
    ],
    stack: ["React", "Redux", "TypeScript", "GraphQL", "E2E Encryption"],
  },
  {
    company: "Forest Park Group",
    role: "Software Engineer",
    location: "via Nodogoro",
    start: "Aug 2020",
    end: "Jul 2022",
    summary:
      "Developed full-stack features for LoanOS, a loan digitization platform using blockchain-based smart contracts to automate lending workflows.",
    highlights: [
      "Built responsive user interfaces with React, Redux, HTML, and CSS.",
      "Implemented backend services in Node.js with typed API contracts.",
      "Authored Rust-based smart contracts for on-chain loan logic and integrated them into the web application.",
    ],
    stack: ["React", "Redux", "Node.js", "Rust", "Blockchain"],
  },
];

export const education = [
  {
    school: "German University in Cairo",
    degree: "BSc Computer Science & Engineering",
    period: "2015 – 2020",
    note: "GPA 1.09 (A equivalent — German 1.0–5.0 scale, where 1.0 is highest).",
  },
];

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "Arabic", level: "Native" },
];
