import type { InlineSegment, Rich, SectionMeta } from './types';

/* ------------------------------------------------------------------ */
/* §03 Selected work                                                   */
/* Repository links point to public GitHub repositories only.          */
/* ------------------------------------------------------------------ */

export interface Project {
  readonly idx: string;
  readonly name: string;
  readonly kind: string;
  /** Short source label shown in the collapsed row. */
  readonly source: string;
  readonly problem: string;
  readonly approach: string;
  /** Optional mini schematic (e.g. architecture or pipeline). */
  readonly schematic?: {
    readonly heading: string;
    readonly ariaLabel: string;
    readonly steps: readonly string[];
  };
  readonly stack: readonly string[];
  /** Public repository, or `null` when the source is not public. */
  readonly repository: string | null;
}

export const workSection: SectionMeta = { num: '§03', label: 'Selected work', note: 'Embedded · Vision · GenAI · Platforms' };

export const workIntro = {
  title: 'Other systems, *end to end.*' satisfies Rich,
  body: 'The problem, my approach and the stack for each project — with the code when it is public.',
  labels: {
    problem: 'Problem',
    approach: 'Approach',
    stack: 'Stack',
    repository: 'Repository',
    notPublic: 'Source not public',
  },
};

export const projects: readonly Project[] = [
  {
    idx: 'P.01',
    name: 'IoT-AI Fire Extinguisher',
    kind: 'Embedded systems · Computer vision · IoT',
    source: 'GitHub',
    problem: 'Detect a fire with a low-cost camera and put it out automatically.',
    // TODO(confirm, Q7): was YOLOv3-Tiny actually used in this project? (cited on the CV, not in the repo)
    approach:
      'An ESP32-CAM sends video to a Python/OpenCV detector (flame colour, shape and motion). On detection, MQTT tells a second ESP32 to start the pump and alarm, with a 60-second safety shut-off.',
    schematic: {
      heading: 'Architecture',
      ariaLabel: 'ESP32-CAM, then vision node, then MQTT, then ESP32 relay node, then pump and alarm',
      steps: ['ESP32-CAM', 'Vision node · OpenCV', 'MQTT', 'ESP32 · relays', 'Pump · alarm'],
    },
    stack: ['ESP32-CAM', 'ESP32', 'Python', 'OpenCV', 'MQTT · PubSubClient', 'C/C++ · Arduino'],
    repository: 'https://github.com/yosrarhim/IoT-AI-Fire-Extinguisher-System',
  },
  {
    idx: 'P.02',
    name: 'Smart Chatbot — RAG',
    kind: 'Generative AI · NLP · Retrieval',
    source: 'GitHub',
    problem: 'Answer questions from real documents instead of inventing answers.',
    approach:
      'Documents are indexed with FAISS; the most relevant passages are given to a Hugging Face language model, and a Flask API returns the answer with its sources (RAG).',
    schematic: {
      heading: 'Pipeline',
      ariaLabel: 'Question, then embedding, then FAISS top-k, then prompt, then language model, then answer with sources',
      steps: ['Question', 'Embed', 'FAISS top-k', 'Prompt', 'LLM', 'Answer + sources'],
    },
    stack: ['Python', 'Transformers', 'sentence-transformers', 'FAISS', 'PyTorch', 'Flask'],
    repository: 'https://github.com/yosrarhim/Smart-Chatbot-AI',
  },
  {
    idx: 'P.03',
    name: 'Smart Stage',
    kind: 'Full-stack · Predictive analytics · Leoni, 2025',
    source: 'GitHub',
    problem: 'Internships at Leoni were followed up by hand.',
    approach:
      'A web platform for interns, coaches and admins, with task recommendations (+30% efficiency), Power BI dashboards and secure role-based access.',
    stack: ['Node.js', 'Express', 'React', 'MongoDB', 'Power BI', 'JWT · RBAC'],
    repository: 'https://github.com/yosrarhim/Smart-Stage-AI-Powered-Internship-Management-Platform-',
  },
  {
    idx: 'P.04',
    name: 'AI Knowledge Assistant',
    kind: 'Generative AI · Summarisation',
    source: 'No public repo',
    problem: 'Technical documents are long and slow to read.',
    approach: 'A generative AI assistant that summarises them (Hugging Face Transformers, Flask).',
    stack: ['Python', 'Hugging Face Transformers', 'Flask'],
    repository: null,
  },
];

export const alsoOnGitHub: readonly InlineSegment[] = [
  'Also on GitHub: ',
  { label: 'OpenCV image-processing labs', href: 'https://github.com/yosrarhim/monprojet' },
  ' (filtering, Canny edges, thresholding, shape detection) · ',
  { label: 'all repositories', href: 'https://github.com/YosraRhim' },
  '.',
];
