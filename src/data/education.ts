import type { SectionMeta } from './types';

/* ------------------------------------------------------------------ */
/* §07 Education & certifications — exact names from the CV.          */
/* ------------------------------------------------------------------ */

export interface Degree {
  readonly period: string;
  readonly level: string;
  readonly title: string;
  readonly school: string;
}

export interface Certificate {
  readonly name: string;
  readonly issuer: string;
  /** PDF in /public/docs, or `null` when only available on request. */
  readonly pdf: string | null;
}

export interface Language {
  readonly name: string;
  readonly level: string;
}

export const educationSection: SectionMeta = { num: '§07', label: 'Education & certifications', note: '2020 — 2026' };

export const educationTitle = 'Foundations.';

export const degrees: readonly Degree[] = [
  {
    period: '2023 — 2026',
    level: 'Engineering degree',
    title: 'Engineering Cycle in Embedded Electronic Systems & Telecommunications',
    school: "ESPRIM — École Supérieure Privée d'Ingénieurs de Monastir",
  },
  {
    period: '2020 — 2023',
    level: "Bachelor's degree",
    title: "Bachelor's Degree in Embedded Systems",
    school: "ISIMM — Institut Supérieur d'Informatique et de Mathématiques de Monastir",
  },
  {
    period: 'June 2020',
    level: 'Baccalaureate',
    title: 'Baccalaureate Diploma in Technical Sciences',
    school: 'High school, Monastir',
  },
];

export const certificationsLabels = {
  aside: 'Certifications and languages',
  title: 'Certifications',
  view: 'View',
  viewSuffix: ' certificate (PDF)',
  onRequest: 'On request',
};

export const certificates: readonly Certificate[] = [
  { name: 'Getting Started with Deep Learning', issuer: 'NVIDIA DLI · Nov 2024', pdf: '/docs/certificates/nvidia-getting-started-with-deep-learning.pdf' },
  { name: 'Applications of AI for Predictive Maintenance', issuer: 'NVIDIA DLI · Nov 2024', pdf: '/docs/certificates/nvidia-applications-of-ai-for-predictive-maintenance.pdf' },
  { name: 'Industry 4.0 Fundamentals', issuer: 'Novation City · Nov 2024', pdf: '/docs/certificates/novation-industry-4-0-fundamentals.pdf' },
  { name: 'ROS Code Foundation — Linux & Python 3 for robotics', issuer: 'The Construct · Jan 2025', pdf: '/docs/certificates/the-construct-ros-code-foundation.pdf' },
  // TODO(confirm, Q6): provide the PDF, keep "On request", or remove.
  { name: 'Python for Data Science', issuer: 'Coursera · 2025', pdf: null },
];

export const languagesTitle = 'Languages';

export const languages: readonly Language[] = [
  { name: 'Arabic', level: 'Native' },
  // TODO(confirm, Q1): French level (e.g. certified B1/B2 vs. C1).
  { name: 'French', level: 'Fluent (C1)' },
  { name: 'English', level: 'Professional (B2)' },
];
