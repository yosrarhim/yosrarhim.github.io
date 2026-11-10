import type { Link, Rich, SectionMeta } from './types';

/* ------------------------------------------------------------------ */
/* §04 Experience — source: CV                                         */
/* ------------------------------------------------------------------ */

export interface Job {
  readonly org: string;
  readonly role: string;
  readonly place: string;
  /** ISO value for <time datetime>, and the human label. */
  readonly when: { readonly datetime: string; readonly label: string };
  readonly type: string;
  readonly project: string;
  readonly highlights: readonly string[];
  readonly tags?: readonly string[];
  /** Featured entry links to its case study. */
  readonly caseStudy?: Link;
}

export const experienceSection: SectionMeta = { num: '§04', label: 'Experience', note: '2022 — 2026' };

export const experienceTitle: Rich = 'Five organisations, *one direction.*';

export const jobs: readonly Job[] = [
  {
    org: 'ACTIA Engineering Services',
    role: 'AI Engineer — final-year engineering project',
    place: 'Tunis',
    when: { datetime: '2026-02', label: 'Feb — Jun 2026' },
    type: 'Final-year project',
    project: 'Edge Sense AI — federated AI platform for industrial predictive maintenance',
    highlights: [
      // TODO(confirm, Q8): is the 500-machine fleet real or simulated?
      'Edge-AI / federated-learning platform (FedAvg) for predictive fault detection across a 500-machine fleet, without centralising raw data.',
      'Local GRU model — 0.943 accuracy, 0.983 AUC-ROC — with weight transmission over MQTT (Mosquitto).',
      'Spring Boot backend (REST, JWT, FedAvg) and real-time React dashboard (WebSocket / STOMP) with automated alerts and reports.',
      'Six-service Docker Compose deployment.',
    ],
    caseStudy: { label: 'Read the case study ↑', href: '#edge-sense-ai' },
  },
  {
    org: 'Leoni',
    role: 'AI Engineer & Full-Stack Intern',
    place: 'Sousse',
    when: { datetime: '2025-06', label: 'Jun 2025' },
    type: 'Internship',
    project: 'Smart Stage — AI-powered internship management platform',
    highlights: [
      'Developed a full-stack web platform with Node.js, React.js, MongoDB and Power BI.',
      'Implemented predictive analytics for automated task recommendations (+30% efficiency).',
      'Implemented JWT authentication and role-based access control for interns, coaches and administrators.',
    ],
    tags: ['Node.js', 'React', 'MongoDB', 'Power BI', 'JWT'],
  },
  {
    org: 'Dräxlmaier',
    role: 'AI Developer Intern',
    place: 'Sousse',
    when: { datetime: '2024-08', label: 'Aug 2024' },
    type: 'Internship',
    project: 'Predictive analytics platform',
    highlights: [
      'Created a real-time analytics platform reaching 95% forecasting accuracy with ensemble models.',
      'Implemented automated data pipelines and Power BI dashboards for AI-driven decision-making.',
    ],
    tags: ['Ensemble models', 'Data pipelines', 'Power BI'],
  },
  {
    // TODO(confirm, Q4): full name and nature of CRMN (company or research centre).
    org: 'CRMN',
    role: 'AI & Web Developer Intern',
    place: 'Sousse',
    when: { datetime: '2023-01', label: 'Jan — Jun 2023' },
    type: 'Internship',
    project: 'AI-driven telemedicine platform with a smart mobile robot for remote consultations',
    highlights: [
      'Developed a telemedicine robot with AI-assisted remote diagnostics.',
      'Built a web interface (React, Firebase, SQL) for live doctor–robot interaction.',
    ],
    tags: ['Robotics', 'React', 'Firebase', 'SQL'],
  },
  {
    org: 'Watts Electronics',
    role: 'IoT Developer Intern',
    place: 'Monastir',
    // TODO(confirm, Q5): exact internship dates.
    when: { datetime: '2022', label: '2022' },
    type: 'Internship',
    project: 'Smart device development',
    highlights: ['Designed electronic boards for smart environmental monitoring with Arduino, ESP32 and STM32.'],
    tags: ['Arduino', 'ESP32', 'STM32', 'Board design'],
  },
];
