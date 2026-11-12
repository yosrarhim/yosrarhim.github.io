import type { Rich, SectionMeta } from './types';

/* ------------------------------------------------------------------ */
/* §05 Expertise — five domains; every tool comes from the CV and is   */
/* mapped to the work that backs it.                                   */
/* ------------------------------------------------------------------ */

export interface Domain {
  readonly idx: string;
  readonly name: string;
  readonly tools: readonly string[];
  readonly evidence: string;
}

export const expertiseSection: SectionMeta = { num: '§05', label: 'Expertise', note: 'Every tool mapped to evidence' };

export const expertiseTitle: Rich = 'Technical *capabilities.*';

export const evidenceLabel = 'Used in';

export const domains: readonly Domain[] = [
  {
    idx: 'E.01',
    name: 'AI & machine learning',
    // TODO(confirm, Q7): keep "YOLOv3" only if it was used (it is on the CV).
    tools: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'GRU / RNN', 'Federated learning', 'NLP · LLM · RAG', 'OpenCV · YOLOv3'],
    evidence: 'Edge Sense AI · Smart Chatbot · Dräxlmaier',
  },
  {
    idx: 'E.02',
    name: 'Embedded systems',
    tools: ['ESP32 · ESP32-CAM', 'STM32', 'Arduino', 'Raspberry Pi', 'C / C++', 'Board design'],
    evidence: 'Watts Electronics · Fire extinguisher · CRMN robot',
  },
  {
    idx: 'E.03',
    name: 'IoT & communication',
    tools: ['MQTT', 'Wi-Fi', 'REST', 'WebSocket'],
    evidence: 'Edge Sense AI · Fire extinguisher',
  },
  {
    idx: 'E.04',
    name: 'Full-stack development',
    tools: ['React', 'Angular', 'Node.js · Express', 'Spring Boot', 'Flask · FastAPI', 'JWT'],
    evidence: 'Edge Sense AI · Smart Stage · CRMN',
  },
  {
    idx: 'E.05',
    name: 'Data & tools',
    tools: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Power BI', 'Docker', 'Git', 'Agile / Scrum'],
    evidence: 'Edge Sense AI · Leoni · Dräxlmaier',
  },
];
