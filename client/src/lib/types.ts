export type ChallengeSolution = {
  challenge: string;
  solution: string;
};

export type ArchitectureLayer = {
  layer: string;
  detail: string;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  oneLiner: string;
  description: string;
  tech: string[];
  year: string;
  timeline: string;
  role: string;
  problem: string;
  solution: string;
  architectureLayers: ArchitectureLayer[];
  features: string[];
  challenge: ChallengeSolution;
  results: string[];
  codeSnippet: { label: string; code: string };
};

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
};

export type Post = PostMeta & {
  content: string;
};

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

export type SkillCategory = {
  name: string;
  skills: string[];
};

export type Skills = {
  categories: SkillCategory[];
  highlightedIntegrations: string[];
};

export type Snapshot = {
  projects: Project[];
  posts: PostMeta[];
  fullPosts: Post[];
  experience: ExperienceEntry[];
  skills: Skills;
};
