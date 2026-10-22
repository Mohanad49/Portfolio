import { getCollection, getEntry } from 'astro:content';

export async function getProfile() {
  const entry = await getEntry('profile', 'mohanad');
  if (!entry) throw new Error('The portfolio profile is missing.');
  return entry.data;
}

export async function getProjects() {
  return (await getCollection('caseStudies')).sort((a, b) => a.data.order - b.data.order);
}
