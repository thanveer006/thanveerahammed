export type ExperienceEntry = {
  role: string;
  company: string;
  companyUrl?: string;
  start: string;
  end: string;
  type: string;
  impact: string;
  responsibilities: string[];
  tech: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Software Developer",
    company: "DOPA Coaching",
    start: "April 2026",
    end: "Present",
    type: "Full-time",
    impact:
      "Designing and shipping the internal software systems DOPA Coaching runs on — enterprise HR tooling, mentor operations, event registration, and workflow automation — replacing manual, spreadsheet-driven processes with production applications used daily across the organization.",
    responsibilities: [
      "Own end-to-end delivery of internal platforms: architecture, database design, API design, and deployment.",
      "Build role-based, secure systems (JWT auth, RBAC) for payroll, scheduling, and mentor management.",
      "Integrate third-party platforms into business workflows: HDFC SmartGateway for payments, Meta WhatsApp Business API for notifications, Cloudinary for media.",
      "Design and automate multi-step business workflows (approvals, scheduling, reporting) to remove manual coordination.",
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Prisma", "JWT", "RBAC", "n8n"],
  },
  {
    role: "Freelance AI Mentor & Web Developer",
    company: "Self-Employed",
    start: "2025",
    end: "Present",
    type: "Freelance",
    impact:
      "Teach applied AI and modern web development to students and working professionals, while delivering client web projects — pairing real engineering work with the ability to explain systems clearly.",
    responsibilities: [
      "Run hands-on sessions on applied AI, prompt engineering, and workflow automation.",
      "Design and build client-facing web applications from requirements to deployment.",
      "Advise learners on modern full-stack architecture and development practices.",
    ],
    tech: ["React", "Node.js", "Prompt Engineering", "AI Automation"],
  },
  {
    role: "Freelance Graphic Designer",
    company: "Self-Employed",
    start: "2023",
    end: "2025",
    type: "Freelance",
    impact:
      "Delivered brand identity and marketing design for clients across digital and print media — the visual and typographic foundation now carried into the interfaces I build.",
    responsibilities: [
      "Created visual identities, brand systems, and UI mockups for client products.",
      "Produced marketing and social media creative across digital and print channels.",
    ],
    tech: ["Brand Identity", "UI Design", "Adobe Photoshop", "Adobe Illustrator"],
  },
];
