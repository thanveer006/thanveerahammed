/**
 * The "V" in MVC for a JSON API: pure functions that shape Mongoose documents
 * into the DTOs the client consumes. Keeps Mongo internals (`_id`, `__v`,
 * timestamps, `order`) out of the wire format.
 */
import { toPostMeta } from "../services/content.service.js";

type AnyDoc = Record<string, unknown>;

export function serializeProject(p: AnyDoc) {
  return {
    slug: p.slug,
    name: p.name,
    category: p.category,
    oneLiner: p.oneLiner,
    description: p.description,
    tech: p.tech ?? [],
    year: p.year,
    timeline: p.timeline,
    role: p.role,
    problem: p.problem,
    solution: p.solution,
    architectureLayers: (p.architectureLayers as AnyDoc[] | undefined)?.map((l) => ({
      layer: l.layer,
      detail: l.detail,
    })) ?? [],
    features: p.features ?? [],
    challenge: {
      challenge: (p.challenge as AnyDoc)?.challenge,
      solution: (p.challenge as AnyDoc)?.solution,
    },
    results: p.results ?? [],
    codeSnippet: {
      label: (p.codeSnippet as AnyDoc)?.label,
      code: (p.codeSnippet as AnyDoc)?.code,
    },
  };
}

export function serializeExperience(e: AnyDoc) {
  return {
    role: e.role,
    company: e.company,
    companyUrl: e.companyUrl ?? undefined,
    start: e.start,
    end: e.end,
    type: e.type,
    impact: e.impact,
    responsibilities: e.responsibilities ?? [],
    tech: e.tech ?? [],
  };
}

export function serializeSkillCategory(c: AnyDoc) {
  return { name: c.name, skills: c.skills ?? [] };
}

export function serializePostMeta(p: AnyDoc) {
  return toPostMeta(p as never, p.content as string);
}

export function serializePost(p: AnyDoc) {
  return { ...serializePostMeta(p), content: p.content };
}
