export type SkillCategory = {
  name: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  { name: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { name: "Backend", skills: ["Node.js", "Express.js", "REST APIs", "Socket.IO", "Server-Sent Events"] },
  { name: "Database", skills: ["MongoDB", "Prisma", "Data Modeling"] },
  { name: "Security", skills: ["JWT", "RBAC", "Auth Design"] },
  { name: "AI", skills: ["LLM APIs", "Prompt Engineering", "Applied AI"] },
  { name: "Automation", skills: ["n8n", "Zapier", "Workflow Automation", "WhatsApp Business API"] },
  { name: "Cloud & Deployment", skills: ["Vercel", "Cloudinary", "CI/CD"] },
  { name: "Integrations", skills: ["HDFC SmartGateway", "Meta WhatsApp Business Platform", "EmailJS"] },
];

export const highlightedIntegrations: string[] = [
  "HDFC SmartGateway",
  "Meta WhatsApp Business Platform",
  "Cloudinary",
  "JWT",
  "RBAC",
  "MongoDB",
  "Prisma",
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
];
