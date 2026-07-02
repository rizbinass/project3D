import {
  Award,
  BriefcaseBusiness,
  Camera,
  Code2,
  GraduationCap,
  Mail,
  Music2,
  Rocket,
  Sparkles,
  UserRound,
} from "lucide-react";

export const projectsContent = [
  {
    title: "Spatial Analytics Dashboard",
    category: "SaaS",
    summary:
      "A real-time operating dashboard with 3D data scenes, metric drilldowns, and executive reporting.",
    tech: ["Next.js", "Three.js", "PostgreSQL", "Framer Motion"],
    gallery: ["Command center", "Realtime charts", "Team workflow"],
    github: "https://github.com/",
    demo: "https://vercel.com/",
  },
  {
    title: "Immersive Product Configurator",
    category: "3D Commerce",
    summary:
      "Premium interactive product viewer with material variants, cinematic camera paths, and fast checkout handoff.",
    tech: ["R3F", "Drei", "GSAP", "Stripe"],
    gallery: ["Material editor", "Product view", "Checkout bridge"],
    github: "https://github.com/",
    demo: "https://vercel.com/",
  },
  {
    title: "Creative Studio OS",
    category: "Workflow",
    summary:
      "Project planning, review boards, client portals, and delivery automation for boutique design teams.",
    tech: ["React", "Zustand", "Node", "Resend"],
    gallery: ["Board", "Timeline", "Client portal"],
    github: "https://github.com/",
    demo: "https://vercel.com/",
  },
] as const;

export const skillsContent = [
  {
    category: "Frontend",
    icon: Code2,
    skills: [
      { label: "React / Next.js", value: 94 },
      { label: "TypeScript", value: 91 },
      { label: "Design Systems", value: 89 },
    ],
  },
  {
    category: "3D Engineering",
    icon: Sparkles,
    skills: [
      { label: "Three.js / R3F", value: 88 },
      { label: "Shaders", value: 76 },
      { label: "Performance", value: 86 },
    ],
  },
  {
    category: "Product",
    icon: Rocket,
    skills: [
      { label: "UX Strategy", value: 90 },
      { label: "Motion Direction", value: 84 },
      { label: "Delivery Leadership", value: 92 },
    ],
  },
] as const;

export const aboutContent = {
  intro:
    "I design and build refined digital products where interface quality, motion, and engineering discipline meet.",
  journey: [
    "Started with interface craft and front-end engineering.",
    "Moved into design systems, product architecture, and performance-heavy applications.",
    "Now focused on premium web experiences, 3D interfaces, and scalable product platforms.",
  ],
  education: [
    "B.S. Computer Science",
    "Human-centered design certification",
    "Continuous graphics and WebGL study",
  ],
  goals: ["Build memorable products", "Lead durable systems", "Make complex tools feel calm"],
};

export const experienceContent = [
  {
    company: "Independent Studio",
    role: "Principal Front-End Engineer",
    period: "2024 - Present",
    responsibilities: ["Immersive web systems", "Design-system architecture", "Performance audits"],
  },
  {
    company: "Product Lab",
    role: "Senior React Engineer",
    period: "2021 - 2024",
    responsibilities: ["SaaS dashboards", "Component platforms", "Analytics workflows"],
  },
  {
    company: "Creative Agency",
    role: "UI Engineer",
    period: "2018 - 2021",
    responsibilities: ["Brand sites", "Motion systems", "CMS integrations"],
  },
] as const;

export const certificatesContent = [
  "Advanced React Architecture",
  "Three.js Journey",
  "Google UX Design",
  "AWS Cloud Practitioner",
  "Web Accessibility Specialist",
  "Performance Engineering",
] as const;

export const photographyContent = [
  "Urban light study",
  "Workspace details",
  "Glass reflections",
  "Night architecture",
  "Studio portrait",
  "Product silhouette",
  "Motion blur",
  "Minimal landscape",
] as const;

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "Email", href: "mailto:hello@example.com" },
] as const;

export const musicContent = [
  "Ambient focus playlists",
  "Synthwave coding sessions",
  "Piano for deep work",
  "Studio reference tracks",
] as const;

export const sectionMeta = {
  projects: { title: "Projects", icon: BriefcaseBusiness },
  skills: { title: "Skills", icon: Code2 },
  about: { title: "About", icon: UserRound },
  experience: { title: "Experience", icon: GraduationCap },
  certificates: { title: "Certificates", icon: Award },
  photography: { title: "Photography", icon: Camera },
  resume: { title: "Resume", icon: Rocket },
  contact: { title: "Contact", icon: Mail },
  music: { title: "Music", icon: Music2 },
} as const;
