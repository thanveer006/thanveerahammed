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
    role: "Software Developer (IT Executive)",
    company: "DOPA Coaching",
    start: "April 2026",
    end: "Present",
    type: "Full-time",
    impact:
      "Designing and shipping the internal software systems DOPA Coaching runs on — enterprise HR tooling, mentor operations, event registration, and AI-powered workflow automation — replacing manual, spreadsheet-driven processes with production applications used daily across the organization.",
    responsibilities: [
      "Own end-to-end delivery of internal platforms: architecture, database design, API design, and deployment.",
      "Build role-based, secure systems (JWT auth, RBAC) for payroll, scheduling, and mentor management.",
      "Integrate AI tools (ChatGPT, Gemini, Claude) into internal systems to automate repetitive operational work.",
      "Integrate third-party platforms into business workflows: HDFC SmartGateway for payments, Meta WhatsApp Business API for notifications, Cloudinary for media.",
      "Design and automate multi-step business workflows (approvals, scheduling, reporting) to remove manual coordination.",
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Prisma", "JWT", "RBAC"],
  },
  {
    role: "Freelance Applied AI Mentor & Developer",
    company: "Self-Employed",
    start: "2026",
    end: "Present",
    type: "Freelance",
    impact:
      "Mentor individuals and teams on implementing real-world AI systems and automation workflows, while delivering client web projects — pairing hands-on engineering work with the ability to explain systems clearly.",
    responsibilities: [
      "Guide learners on practical, hands-on AI implementation using APIs and LLM integrations — not just theory.",
      "Help clients design and build automation workflows and AI-integrated applications.",
      "Design and build client-facing web applications from requirements to deployment.",
    ],
    tech: ["React", "Node.js", "Prompt Engineering", "AI Automation"],
  },
  {
    role: "Full Stack Development & AI Trainee",
    company: "HACA (Tech School)",
    start: "April 2025",
    end: "March 2026",
    type: "Intensive Training",
    impact:
      "Completed an intensive MERN full-stack development and applied AI program — the foundation where I learned to code and moved into applied AI, building production-level projects rather than tutorials.",
    responsibilities: [
      "Built a full-stack e-commerce platform and a real-time social app using Socket.IO.",
      "Built a full-stack music streaming application, covering both client and server architecture.",
      "Trained across the MERN stack (MongoDB, Express.js, React, Node.js) and API design end to end.",
    ],
    tech: ["MongoDB", "Express.js", "React", "Node.js", "Socket.IO"],
  },
];
