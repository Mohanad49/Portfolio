import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const caseStudies = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(), slug: z.string(), eyebrow: z.string(), summary: z.string(),
    role: z.string(), order: z.number(), category: z.string(), stack: z.array(z.string()),
    repository: z.url(), report: z.url(), reportLabel: z.string(), evidence: z.url(),
    evidenceDate: z.string(), boundary: z.string(),
  }),
});

const profile = defineCollection({
  loader: file('./src/data/profile.json', {
    parser: (text) => [{ id: 'mohanad', ...JSON.parse(text) }],
  }),
  schema: z.object({
    name: z.string(), role: z.string(), headline: z.array(z.string()), introduction: z.string(),
    location: z.string(), email: z.email(), linkedin: z.url(), github: z.url(),
    resume: z.string(), portrait: z.string(), bio: z.string(),
    metrics: z.array(z.object({ value: z.string(), label: z.string(), scope: z.string() })),
    experience: z.array(z.object({
      company: z.string(), role: z.string(), period: z.string(), summary: z.string(),
      highlights: z.array(z.string()),
    })),
    approach: z.array(z.object({ title: z.string(), description: z.string(), evidence: z.string() })),
    education: z.object({ institution: z.string(), degree: z.string(), period: z.string(), project: z.string(), projectSummary: z.string() }),
    credentials: z.array(z.object({ name: z.string(), detail: z.string(), image: z.string() })),
    languages: z.array(z.string()),
  }),
});

const frameworks = defineCollection({
  loader: file('./src/data/frameworks.json'),
  schema: z.object({
    legacyId: z.number(), title: z.string(), category: z.string(), description: z.string(),
    stack: z.array(z.string()), repository: z.url(), report: z.url().nullable().optional(),
  }),
});

export const collections = { caseStudies, profile, frameworks };
