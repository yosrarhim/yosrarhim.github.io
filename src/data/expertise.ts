import type { Rich, SectionMeta } from './types';

/* ------------------------------------------------------------------ */
/* §05 Expertise — every tool is mapped to the evidence that backs it. */
/* ------------------------------------------------------------------ */

export interface Domain {
  readonly idx: string;
  readonly name: string;
  readonly tools: readonly string[];
  readonly evidence: string;
}

export const expertiseSection: SectionMeta = { num: '§05', label: 'Expertise', note: 'Every tool mapped to evidence' };

export const expertiseTitle: Rich = 'Technical *capabilities.*';

export const evidenceLabel = 'Evidence';

export const domains: readonly Domain[] = [
  {
    idx: 'E.01',
    name: 'AI & machine learning',
    tools: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'GRU / RNN', 'Ensemble models', 'Transformers (BERT, GPT)', 'NLP · LLM', 'RAG · FAISS'],
    evidence: 'Edge Sense AI · Smart Chatbot · Dräxlmaier · NVIDIA DLI',
  },
  {
    idx: 'E.02',
    name: 'Federated & edge AI',
    tools: ['FedAvg', 'Cross-device FL', 'Sliding-window inference', 'Threshold calibration'],
    evidence: 'Edge Sense AI (ACTIA, 2026)',
  },
  {
    idx: 'E.03',
    name: 'Embedded systems & electronics',
    tools: ['ESP32 · ESP32-CAM', 'STM32', 'Arduino', 'Raspberry Pi', 'C / C++', 'Board design', 'ROS basics'],
    evidence: 'Watts Electronics · Fire extinguisher · CRMN robot · The Construct',
  },
  {
    idx: 'E.04',
    name: 'Computer vision',
    // TODO(confirm, Q7): keep "YOLOv3" only if it was used.
    tools: ['OpenCV', 'YOLOv3', 'Colour & motion analysis'],
    evidence: 'Fire extinguisher · OpenCV labs',
  },
  {
    idx: 'E.05',
    name: 'IoT & communication',
    tools: ['MQTT · Mosquitto', 'QoS', 'Wi-Fi', 'REST', 'WebSocket / STOMP'],
    evidence: 'Edge Sense AI · Fire extinguisher',
  },
  {
    idx: 'E.06',
    name: 'Software engineering',
    tools: ['Python · Flask · FastAPI', 'JavaScript', 'Spring Boot', 'Node.js · Express', 'React', 'Angular', 'JWT · RBAC'],
    evidence: 'Edge Sense AI · Smart Stage · CRMN',
  },
  {
    idx: 'E.07',
    name: 'Data, cloud & tooling',
    tools: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase', 'Power BI', 'Docker · Compose', 'Git', 'Postman', 'Agile / Scrum'],
    evidence: 'Edge Sense AI · Leoni · Dräxlmaier',
  },
];
